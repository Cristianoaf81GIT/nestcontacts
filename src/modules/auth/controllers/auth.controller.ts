import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtUpdateTokenGuard } from '../strategies/jwt.auth.update-token.guard';
import { LocalAuthGuard } from '../strategies/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('user')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('refresh/token')
  @UseGuards(JwtUpdateTokenGuard)
  async refresh(@Request() req) {
    return this.authService.login(req.user);
  }
}
