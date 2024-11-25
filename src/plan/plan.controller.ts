import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PurchasePlanDto } from './dto/purchase-plan.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  async create(@Body(new ValidationPipe()) purchasePlanDto: PurchasePlanDto) {
    return await this.planService.purchasePlan(purchasePlanDto);
  }
}
