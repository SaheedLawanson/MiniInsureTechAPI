import { Injectable } from '@nestjs/common';
import { Wallet } from './entities/wallet.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet) private walletModel: typeof Wallet) {}

  async getWalletByUserId(user_id: number) {
    const data = await this.walletModel.findAll({
      where: { user_id }
    })

    if (!data.length) throw "Wallet not found!"

    return {
      id: data[0].id,
      balance: data[0].balance,
      user_id: data[0].user_id,
    }
  }

  async debitWallet(id: number, amount: number) {
    const wallet = await this.walletModel.findByPk(id)

    if (!wallet) throw "Wallet not found!"

    wallet.balance -= amount
    await wallet.save()
  }
}
