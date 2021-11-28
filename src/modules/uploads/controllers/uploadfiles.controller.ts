import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomParseIntPipe } from '../pipes/custom-parseInt.pipe';
import { UploadsService } from '../services/uploads.service';

@Controller('uploadfiles')
export class UploadfilesController {
  constructor(private uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  uploadUserContactAvatar(
    @Query('id', CustomParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Record<string, string> {
    return this.uploadsService.handleUploadAvatarFile(id, file);
  }
}
