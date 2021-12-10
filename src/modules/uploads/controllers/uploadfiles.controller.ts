import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/strategies/jwt-auth.guard';
import { CustomParseIntPipe } from '../pipes/custom-parseInt.pipe';
import { UploadsService } from '../services/uploads.service';

@Controller('uploadfiles')
export class UploadfilesController {
  constructor(private uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  uploadUserContactAvatar(
    @Query('id', CustomParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ): Record<string, string> {
    return this.uploadsService.handleUploadAvatarFile(id, file);
  }
}
