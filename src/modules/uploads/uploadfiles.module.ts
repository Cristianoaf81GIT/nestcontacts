import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadfilesController } from './controllers/uploadfiles.controller';
import { UploadsServiceConfiguration } from './config/uploads.service.configuration';
import { UploadsService } from './services/uploads.service';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: UploadsServiceConfiguration }),
  ],
  controllers: [UploadfilesController],
  providers: [UploadsService],
})
export class UploadfilesModule {}
