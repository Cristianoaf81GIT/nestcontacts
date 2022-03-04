import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ContactPaginatedQuery {
  @ApiProperty()
  @Type(() => Number)
  limit: number;

  @ApiProperty()
  @Type(() => Number)
  offset: number;
}
