import {
  Controller,
  Param,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/strategies/jwt-auth.guard';
import { CustomParseIntPipe } from '../pipes/custom-parseInt.pipe';
import { UploadsService } from '../services/uploads.service';

@Controller('uploadfiles')
@UseGuards(JwtAuthGuard)
export class UploadfilesController {
  constructor(private uploadsService: UploadsService) {}

  @Post('avatar/:contactId')
  @UseInterceptors(FileInterceptor('image'))
  uploadUserContactAvatar(
    @Param('contactId', CustomParseIntPipe) contactId: number,
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    return this.uploadsService.handleUploadAvatarFile(
      req.user.userId,
      contactId,
      file,
    );
  }
}
