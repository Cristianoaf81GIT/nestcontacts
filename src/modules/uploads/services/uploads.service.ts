import {
  Injectable,
  Logger,
  PreconditionFailedException,
} from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class UploadsService {
  private logger = new Logger(UploadsService.name);

  handleUploadAvatarFile(
    id: number,
    file: Express.Multer.File,
  ): Record<string, string> {
    if (!file || !file.originalname)
      throw new PreconditionFailedException('Avatar file is required!');

    this.logger.verbose(
      `file: ${file.originalname} was uploaded, ${format(
        new Date(),
        'yyyy-MM-dd HH:mm:ss.SS',
      )} by userId ${id}`,
    );
    return { message: `file: ${file.originalname}, successfully uploaded!` };
  }
}
