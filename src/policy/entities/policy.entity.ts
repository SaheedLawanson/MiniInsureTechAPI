import {
  Column,
  Model,
  Table,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { Plan } from 'src/plan/entities/plan.entity';
import { User } from 'src/user/entities/user.entity';

@Table({
  timestamps: true,
  tableName: 'policy',
  modelName: 'Policy',
})
export class Policy extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  policy_number: string;

  @ForeignKey(() => Plan)
  @Column({ type: DataType.INTEGER, allowNull: false })
  plan_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.FLOAT, allowNull: false })
  user_id: number;

  @Column(DataType.DATE)
  activated_at: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
