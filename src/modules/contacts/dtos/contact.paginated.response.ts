import { ApiProperty } from '@nestjs/swagger';
import { ContactResponseDTO } from './contact.response.dto';

export class ContactPaginatedResponseDto {
  @ApiProperty()
  count: number;

  @ApiProperty({
    type: ContactResponseDTO,
    isArray: true,
  })
  rows: Array<ContactResponseDTO>;
}
