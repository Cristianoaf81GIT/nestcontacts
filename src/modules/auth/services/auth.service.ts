import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configurations: ConfigService,
  ) {}

  async validateUser(email: string): Promise<User> {
    return await this.userService.getUser(email);
  }

  async login(user: User) {
    const payload = { username: user.fullName, sub: user.id };
    const tokenExp = this.configurations.get<string>('TOKEN_EXP');
    const refreshExp = this.configurations.get<string>('REFRESH_EXP');

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: tokenExp }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: refreshExp }),
      user_name: user.fullName,
    };
  }

  async validateToken(token: string) {
    return this.jwtService.decode(token);
  }
}
