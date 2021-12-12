import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadfilesController } from './controllers/uploadfiles.controller';
import { UploadsServiceConfiguration } from './config/uploads.service.configuration';
import { UploadsService } from './services/uploads.service';
import { UsersModule } from '../users/users.module';
import { ContactsModule } from '../contacts/contacts.module';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserContact } from '../users/entities/userContact.entity';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: UploadsServiceConfiguration }),
    SequelizeModule.forFeature([UserContact]),
    UsersModule,
    ContactsModule,
  ],
  controllers: [UploadfilesController],
  providers: [UploadsService],
})
export class UploadfilesModule {}
