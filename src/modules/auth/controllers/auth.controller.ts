import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Post('user')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<any> {
    return req.user;
  }
}
