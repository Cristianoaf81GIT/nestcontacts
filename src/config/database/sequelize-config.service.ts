import { Injectable, Logger } from '@nestjs/common';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  private logger = new Logger(SequelizeConfigService.name);

  createSequelizeOptions():
    | SequelizeModuleOptions
    | Promise<SequelizeModuleOptions> {
    return {
      dialect: process.env.DIALECT as Dialect,
      synchronize: Boolean(process.env.SYNC),
      autoLoadModels: Boolean(process.env.AUTOLOAD),
      logging: this.logger.verbose,
      storage: process.env.STORAGE,

      models: [`${__dirname}/../../../../modules/**/entities/*.entity.ts`],
    };
  }
}
