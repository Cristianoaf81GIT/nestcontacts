import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    return {
      secret: process.env.JWT_SECRET,
      verifyOptions: {
        ignoreExpiration: false,
      },
    };
  }
}
