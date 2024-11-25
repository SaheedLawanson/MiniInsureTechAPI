import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Policy } from '../../policy/entities/policy.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.ENUM('admin'), allowNull: true })
  type: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasOne(() => Wallet)
  wallets: Wallet[];

  @HasMany(() => Policy)
  policies: Policy[];
}
