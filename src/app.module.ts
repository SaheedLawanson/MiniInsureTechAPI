import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dbConfig from './database/config';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { Policy } from './policy/entities/policy.entity';
import { Wallet } from './wallet/entities/wallet.entity';
import { ProductCategory } from './product/entities/product_category.entity';
import { ProductModule } from './product/product.module';
import { WalletModule } from './wallet/wallet.module';
import { PlanModule } from './plan/plan.module';
import { Plan } from './plan/entities/plan.entity';
import { PolicyModule } from './policy/policy.module';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forRoot({
      ...dbConfig[process.env.EXEC_ENV],
      models: [User, Plan, Product, Policy, Wallet, ProductCategory],
    }),
    ProductModule,
    WalletModule,
    PlanModule,
    PolicyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
