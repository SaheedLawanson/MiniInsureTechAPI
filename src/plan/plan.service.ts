import { Injectable } from '@nestjs/common';
import { Plan } from './entities/plan.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PurchasePlanDto } from './dto/purchase-plan.dto';
import { ProductService } from 'src/product/product.service';
import { WalletService } from 'src/wallet/wallet.service';
import { PolicyService } from 'src/policy/policy.service';
import { Policy } from 'src/policy/entities/policy.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan) private planModel: typeof Plan,
    private productService: ProductService,
    private walletService: WalletService,
    private policyService: PolicyService,
  ) {}

  async purchasePlan(purchasePlanDto: PurchasePlanDto) {
    const static_user_id = 1;

    // Fetch the product
    const product = await this.productService.getProduct(
      purchasePlanDto.product_id,
    );

    // Debit user wallet
    const wallet = await this.walletService.findByUserId(static_user_id);
    await this.walletService.debitWallet(
      wallet.id,
      product.price * purchasePlanDto.quantity,
    );

    // Create the plan
    const plan = await this.create({
      description: purchasePlanDto.description,
      product_id: product.id,
      price_sold: product.price,
    });

    // Create the policies
    await Promise.all(Array.from({ length: purchasePlanDto.quantity }, () =>
      this.policyService.create({ plan_id: plan.id })
    ));

    return { message: "Successfully purchased plan"}
  }

  async create(input: {
    description: string;
    product_id: number;
    price_sold: number;
  }) {
    return await this.planModel.create(input);
  }
}
