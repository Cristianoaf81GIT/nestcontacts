import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactDTO } from '../../dtos/contact.dto';
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
  async getAll(): Promise<Contact[]> {
    return this.contactService.getAll();
  }
}
