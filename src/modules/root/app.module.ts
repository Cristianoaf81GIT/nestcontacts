import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadfilesModule } from '../uploads/uploadfiles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from 'src/config/database/sequelize-config.service';
import { ContactsModule } from '../contacts/contacts.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({ useClass: SequelizeConfigService }),
    UploadfilesModule,
    UsersModule,
    AuthModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
