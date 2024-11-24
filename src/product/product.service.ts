import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCategory } from './entities/product_category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(ProductCategory)
    private productCategoryModel: typeof ProductCategory,
  ) {}

  async findAll() {
    const filter = {}

    let data = await this.productModel.findAll({
      where: filter,
      include: [
        { model: this.productCategoryModel, as: 'category', attributes: [ 'name' ] }
      ]
    })

    const products = data.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category?.name,
      price: product.price,
    }))

    return products
  }
}
