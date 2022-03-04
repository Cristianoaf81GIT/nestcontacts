import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { UserDto } from '../dto/user.dto';
import { UserResponseDto } from '../dto/userResponse.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
// import { attributesToRemoveFromPayload } from '../config/model.attributes';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  // @UseInterceptors(
  //   new TransformInterceptor<User>(attributesToRemoveFromPayload),
  // )
  @ApiOperation({ summary: 'create a new user' })
  @ApiCreatedResponse({ description: 'success', type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'user already exists' })
  @ApiInternalServerErrorResponse({
    description: 'internal server error',
    status: 500,
  })
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }
}
