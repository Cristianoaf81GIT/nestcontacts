import {
  Controller,
  Logger,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiPreconditionFailedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/strategies/jwt-auth.guard';
import { FileUploadResponseDto } from '../dto/file-upload.response.dto';
import { CustomParseIntPipe } from '../pipes/custom-parseInt.pipe';
import { UploadsService } from '../services/uploads.service';

@Controller('uploadfiles')
@ApiBearerAuth()
@ApiTags('file-upload')
@UseGuards(JwtAuthGuard)
export class UploadfilesController {
  private logger = new Logger(UploadfilesController.name);
  constructor(private uploadsService: UploadsService) {}

  @Post('avatar/:contactId')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiOperation({ summary: 'Upload contact avatar' })
  @ApiCreatedResponse({
    description: 'File successfuly uploaded',
    type: FileUploadResponseDto,
  })
  @ApiPreconditionFailedResponse({
    description: 'Avatar file is required!',
  })
  @ApiNotFoundResponse({ description: 'user not found' })
  @ApiNotFoundResponse({ description: 'Contact not found!' })
  @ApiBadRequestResponse({
    description: 'you dont have permission to change this contact [contact id]',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
