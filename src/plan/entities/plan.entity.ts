import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Policy } from 'src/policy/entities/policy.entity';
import { Product } from 'src/product/entities/product.entity';

@Table({
  timestamps: true,
  tableName: 'plans',
  modelName: 'Plan',
})
export class Plan extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  product_id: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price_sold: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasMany(() => Policy)
  policies: Policy[];

  @BelongsTo(() => Product, { as: 'product' })
  product?: Product
}
