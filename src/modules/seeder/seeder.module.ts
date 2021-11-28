import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from '../../config/database/sequelize-config.service';
import { Contact } from '../contacts/entities/contact.entity';
import { ContactSeeder } from '../contacts/seeder/contact.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({ useClass: SequelizeConfigService }),
    SequelizeModule.forFeature([Contact]),
  ],
  controllers: [],
  providers: [ContactSeeder],
})
export class SeederModule {}
