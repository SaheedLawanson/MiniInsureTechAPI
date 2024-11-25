import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Wallet } from './entities/wallet.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet) private walletModel: typeof Wallet) {}

  async getWalletByUserId(user_id: number) {
    const data = await this.findByUserId(user_id)
    return {
      message: 'Successfully fetched wallet',
      data: {
        wallet: {
          id: data.id,
          balance: data.balance,
          user_id: data.user_id,
        },
      },
    };
  }

  async debitWallet(id: number, amount: number) {
    const wallet = await this.walletModel.findByPk(id);

    if (!wallet)
      throw new HttpException('Wallet not found!', HttpStatus.NOT_FOUND);

    wallet.balance -= amount;
    await wallet.save();
  }

  async findOne(id: number) {
    const data = await this.walletModel.findOne({
      where: { id },
    });

    if (!data)
      throw new HttpException('Wallet not found!', HttpStatus.NOT_FOUND);

    return data.get({ plain: true })
  }

  async findByUserId(user_id: number) {
    const data = await this.walletModel.findOne({
      where: { user_id },
    });

    if (!data)
      throw new HttpException('Wallet not found!', HttpStatus.NOT_FOUND);

    return data.get({ plain: true })
  }
}
