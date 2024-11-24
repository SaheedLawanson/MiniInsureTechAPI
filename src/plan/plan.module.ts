import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from './entities/plan.entity';

@Module({
  imports: [SequelizeModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
