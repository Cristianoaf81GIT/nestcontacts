import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaginatedResponse } from '../../../../utils/paginated.response';
import { ContactDTO } from '../../dtos/contact.dto';
import { ContactPaginatedQuery } from '../../dtos/contact.paginated.query';
import { Contact } from '../../entities/contact.entity';
import { ContactService } from '../../services/contact.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactService) {}
  @Post()
  async create(@Body() contactDto: ContactDTO): Promise<Contact> {
    return this.contactService.create(contactDto);
  }

  @Get()
  async getAll(
    @Query() params: ContactPaginatedQuery,
  ): Promise<PaginatedResponse> {
    return this.contactService.getAll(params);
  }
}
