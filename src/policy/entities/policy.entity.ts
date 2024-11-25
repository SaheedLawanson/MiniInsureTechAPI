import {
    Column,
    Model,
    Table,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { Plan } from 'src/plan/entities/plan.entity';
  import { User } from 'src/user/entities/user.entity';
  
  @Table({
    timestamps: true,
    tableName: 'policies',
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
  
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    policy_number: string;
  
    @ForeignKey(() => Plan)
    @Column({ type: DataType.INTEGER, allowNull: false })
    plan_id: number;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.FLOAT, allowNull: true })
    user_id: number;
  
    @Column(DataType.DATE)
    activated_at: Date;
  
    @CreatedAt
    created_at: Date;
  
    @UpdatedAt
    updated_at: Date;
  
    @BelongsTo(() => Plan, { as: 'plan' })
    plan: Plan
  }
  