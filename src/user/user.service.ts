import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize"
import { User } from "./entities/user.entity"

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOne(id: number) {
    return await this.userModel.findOne({ where: {id} })
  }

  async findAll() {
    const data = await this.userModel.findAll({ where: {} })

    const users = data.map(user => ({
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      is_admin: user.type === "admin"
    }))

    return {
      message: "Successfully fetched users",
      data: { users }
    }
  }
}
