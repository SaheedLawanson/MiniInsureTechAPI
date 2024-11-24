import { Column, Model, Table, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table({
    timestamps: true,
    tableName: "wallets",
    modelName: "Wallet"
})
export class Wallet extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    })
    id: number

    @Column({ type: DataType.FLOAT, allowNull: false })
    balance: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: true })
    user_id: number;

    @CreatedAt
    created_at: Date

    @UpdatedAt
    updated_at: Date
}