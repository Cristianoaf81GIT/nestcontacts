import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtUpdateTokenGuard extends AuthGuard('jwt-update-token') {}
