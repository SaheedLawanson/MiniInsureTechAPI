import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Op } from 'sequelize';
import { Policy } from './entities/policy.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../product/entities/product.entity';
import { Plan } from '../plan/entities/plan.entity';
import { ProductCategory } from '../product/entities/product_category.entity';
import { ActivatePolityDto } from './dto/activate-policy.dto';

@Injectable()
export class PolicyService {
  constructor(
    @InjectModel(Policy) private policyModel: typeof Policy,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(Plan) private planModel: typeof Plan,
    @InjectModel(ProductCategory)
    private productCategoryModel: typeof ProductCategory,
  ) {}

  async create(createPolicy: { plan_id: number }) {
    const policy_number = this.generatePolicyNumber();
    console.log('Policy number:', policy_number);
    await this.policyModel.create({
      plan_id: createPolicy.plan_id,
      policy_number,
    });
  }

  async activate(activatePolicyDto: ActivatePolityDto) {
    const policy = await this.policyModel.findOne({
      where: { id: activatePolicyDto.policy_id },
      include: [
        {
          model: this.planModel,
          as: 'plan',
          attributes: ['price_sold'],
          include: [
            {
              model: this.productModel,
              as: 'product',
              attributes: ['name'],
              include: [
                {
                  model: this.productCategoryModel,
                  as: 'category',
                  attributes: ['name'],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!policy)
      throw new HttpException('Policy not found', HttpStatus.NOT_FOUND);

    if (!!policy?.activated_at || !!policy?.user_id)
      throw new HttpException(
        'This policy has already been activated!',
        HttpStatus.BAD_REQUEST,
      );

    const user_policies = await this.policyModel.findAll({
      where: { user_id: activatePolicyDto.user_id },
      include: [
        {
          model: this.planModel,
          as: 'plan',
          attributes: ['price_sold'],
          include: [
            {
              model: this.productModel,
              as: 'product',
              attributes: ['name'],
              include: [
                {
                  model: this.productCategoryModel,
                  as: 'category',
                  attributes: ['name'],
                },
              ],
            },
          ],
        },
      ],
    });

    console.log(
      '\nUser Policies:',
      JSON.stringify(
        user_policies.map((policy) => policy.get({ plain: true })),
        null,
        2,
      ),
    );
    const existing_policy = user_policies.find(
      (current_policy) =>
        current_policy.plan.product.category.name ===
        policy.plan.product.category.name,
    );

    if (!!existing_policy)
      throw new HttpException(
        'This user is already on an active plan in this product category',
        HttpStatus.BAD_REQUEST,
      );

    policy.activated_at = new Date();
    policy.user_id = activatePolicyDto.user_id;
    await policy.save();

    return { message: 'Successfully activated policy' };
  }

  generatePolicyNumber(): string {
    const length = 11;
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.toUpperCase();
  }

  async findAll(
    { plan_id, status }: { plan_id?: string; status?: boolean } = {
      status: false,
    },
  ) {
    const filter: any = {};

    filter.user_id = !!status ? { [Op.ne]: null } : null;
    filter.activated_at = !!status ? { [Op.ne]: null } : null;

    if (plan_id) filter.plan_id = +plan_id;

    const data = await this.policyModel.findAll({
      where: filter,
    });

    return {
      message: 'Successfully fetched policies',
      data: { policies: data.map((policy) => policy.get({ plain: true })) },
    };
  }

  async findOne(id: number): Promise<Policy> {
    const policy = await this.policyModel.findOne({ where: { id } });

    if (!policy)
      throw new HttpException('Policy not found', HttpStatus.NOT_FOUND);

    return policy.get({ plain: true });
  }
}
