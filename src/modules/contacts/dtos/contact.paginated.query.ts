import { Type } from 'class-transformer';

export class ContactPaginatedQuery {
  @Type(() => Number)
  limit: number;

  @Type(() => Number)
  offset: number;
}
