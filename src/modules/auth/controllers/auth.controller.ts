import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponseDto } from '../dto/auth.response.dto';
import { LoginDTO } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { JwtUpdateTokenGuard } from '../strategies/jwt.auth.update-token.guard';
import { LocalAuthGuard } from '../strategies/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('user')
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ description: 'success', type: AuthResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Wrong password!' })
  @ApiInternalServerErrorResponse({ description: 'internal server error' })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDTO })
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('refresh/token')
  @UseGuards(JwtUpdateTokenGuard)
  async refresh(@Request() req) {
    return this.authService.login(req.user);
  }
}
