import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [LocalStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
