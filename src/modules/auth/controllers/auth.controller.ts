import { Controller, Post, UseGuards, Request, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
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
  @HttpCode(200)
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ description: 'success', type: AuthResponseDto, status: 200 })
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
  @ApiHeader({
    name: 'refresh_token',
    description: 'user refresh token',
    allowEmptyValue: false,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async refresh(@Request() req) {
    return this.authService.login(req.user);
  }
}
