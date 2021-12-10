import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { JwtUpdateTokenGuard } from '../strategies/jwt.auth.update-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('user')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('refresh/token')
  @UseGuards(JwtUpdateTokenGuard)
  async refresh(@Request() req) {
    return this.authService.login(req.user);
  }
}
