import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(@InjectModel(User) private UserModel: typeof User) {}
  async create(userDto: UserDto): Promise<User> {
    this.logger.verbose(
      `new user data is arriving: ${JSON.stringify(userDto.email)}`,
    );
    const existingUser = await this.UserModel.findOne({
      where: { email: userDto.email },
    });
    if (existingUser && existingUser.id)
      throw new BadRequestException('user already exists');
    return this.UserModel.create(userDto);
  }

  async getUser(email: string): Promise<User> {
    return await this.UserModel.findOne({
      where: { email },
    });
  }

  async getUserById(id: number): Promise<User> {
    return await this.UserModel.findOne({
      where: { id },
      include: ['contacts'],
    });
  }
}
