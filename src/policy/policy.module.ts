import { forwardRef, Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Policy } from './entities/policy.entity';
import { ProductModule } from 'src/product/product.module';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports: [SequelizeModule.forFeature([Policy]), ProductModule, forwardRef(() => PlanModule)],
  controllers: [PolicyController],
  providers: [PolicyService],
  exports: [PolicyService]
})
export class PolicyModule {}
