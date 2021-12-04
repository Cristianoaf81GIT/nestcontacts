import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
// import { attributesToRemoveFromPayload } from '../config/model.attributes';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  // @UseInterceptors(
  //   new TransformInterceptor<User>(attributesToRemoveFromPayload),
  // )
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }
}
