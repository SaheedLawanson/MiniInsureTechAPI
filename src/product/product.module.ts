import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { ProductCategory } from './entities/product_category.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductCategory])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService, SequelizeModule.forFeature([Product, ProductCategory])]
})
export class ProductModule {}
