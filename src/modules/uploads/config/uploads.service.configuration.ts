import { BadRequestException, Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { Request } from 'express';

@Injectable()
export class UploadsServiceConfiguration implements MulterOptionsFactory {
  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    return {
      storage: diskStorage({
        destination: process.env.UPLOAD_FOLDER,
        filename: (
          _req: Request,
          file: Express.Multer.File,
          cb: (err: Error, fileName: string) => void,
        ): void => {
          const name: string = file.originalname.split('.')[0].trim();
          const ext: string = file.originalname.split('.')[1].trim();
          cb(null, `${name}.${ext}`);
        },
      }),
      limits: {
        fileSize: +process.env.MAX_FILE_SIZE,
      },
      fileFilter: (
        _req: Request,
        file: Express.Multer.File,
        cb: (error: Error | BadRequestException, accept: boolean) => void,
      ): void => {
        const validExtensions = Array.from(process.env.MIME_TYPES.split(','));
        if (!validExtensions.includes(file.mimetype))
          cb(
            new BadRequestException(
              `file type is not allowed: ${file.mimetype}, [accepted: ${validExtensions}] `,
            ),
            false,
          );

        cb(null, true);
      },
    };
  }
}
