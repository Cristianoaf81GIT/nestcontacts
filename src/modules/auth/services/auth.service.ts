import { Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string): Promise<User> {
    return await this.userService.getUser(email);
  }
}
