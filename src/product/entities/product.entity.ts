import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  HasOne,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ProductCategory } from './product_category.entity';
import { Plan } from 'src/plan/entities/plan.entity';

@Table({
  timestamps: true,
  tableName: 'products',
  modelName: 'Product',
})
export class Product extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => ProductCategory)
  @Column({ type: DataType.INTEGER, allowNull: false })
  category_id: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => ProductCategory, { as: 'category' })
  category?: ProductCategory

  @HasMany(() => Plan)
  plans: Plan[]
}
