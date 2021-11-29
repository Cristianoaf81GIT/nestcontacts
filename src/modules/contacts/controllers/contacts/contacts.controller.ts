import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ContactDTO } from '../../dtos/contact.dto';
import { ContactPaginatedQuery } from '../../dtos/contact.paginated.query';
import { Contact } from '../../entities/contact.entity';
import { ContactService } from '../../services/contact.service';
import { ContactPaginatedResponse } from '../../services/interfaces/contact.paginated.response';

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
  ): Promise<ContactPaginatedResponse> {
    return this.contactService.getAll(params);
  }
}
