import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe implements PipeTransform {
  private logger = new Logger(CustomParseIntPipe.name);

  transform(value: any, _metadata: ArgumentMetadata): number {
    if (!value) throw new BadRequestException('id parameter is mandatory');
    if (isNaN(Number(value)) || Number(value) <= 0)
      throw new BadRequestException(
        'id must be a valid number non negative and greather than zero!',
      );
    this.logger.verbose(
      `custom parse int pipe: ${_metadata.type} - ${_metadata.data}`,
    );
    return +value;
  }
}
