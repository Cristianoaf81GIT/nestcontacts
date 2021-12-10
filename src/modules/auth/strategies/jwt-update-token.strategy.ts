import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtTokenUpdateStrategy extends PassportStrategy(
  Strategy,
  'jwt-update-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Record<string, any> | any) {
    return { userId: payload.sub, username: payload.username };
  }
}
