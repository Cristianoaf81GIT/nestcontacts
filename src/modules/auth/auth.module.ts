import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './config/jwt-config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtTokenUpdateStrategy } from './strategies/jwt-update-token.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({ useClass: JwtConfigService }),
    UsersModule,
  ],
  providers: [LocalStrategy, JwtStrategy, JwtTokenUpdateStrategy, AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
