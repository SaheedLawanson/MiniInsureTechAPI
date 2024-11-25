import { forwardRef, Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Plan } from './entities/plan.entity';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { WalletModule } from 'src/wallet/wallet.module';
import { PolicyModule } from 'src/policy/policy.module';

@Module({
  imports: [SequelizeModule.forFeature([Plan]), ProductModule, WalletModule, forwardRef(() => (PolicyModule))],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService, SequelizeModule.forFeature([Plan])]
})
export class PlanModule {}
