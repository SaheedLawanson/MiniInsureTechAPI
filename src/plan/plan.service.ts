import { Injectable } from '@nestjs/common';
import { Plan } from './entities/plan.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectModel(Plan) private planModel: typeof Plan,) {}

  create(createPlanDto: CreatePlanDto) {
    return 'This action adds a new plan';
  }

  findAll() {
    return `This action returns all plan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }
}
