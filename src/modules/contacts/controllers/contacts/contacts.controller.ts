import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CustomParseIntPipe } from 'src/modules/uploads/pipes/custom-parseInt.pipe';
import { PaginatedResponse } from '../../../../utils/paginated.response';
import { ContactDTO } from '../../dtos/contact.dto';
import { ContactPaginatedQuery } from '../../dtos/contact.paginated.query';
import { Contact } from '../../entities/contact.entity';
import { ContactService } from '../../services/contact.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactService) {}
  @Post('user/:id')
  async create(
    @Body() contactDto: ContactDTO,
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<Contact | void> {
    console.log(contactDto);
    console.log(`id do usuario: `, id);
    await this.contactService.create(contactDto, id);
  }

  @Get('user/:id')
  async getAll(
    @Param('id', CustomParseIntPipe) userId,
    @Query() params: ContactPaginatedQuery,
  ): Promise<PaginatedResponse> {
    return this.contactService.getAll(params, userId);
  }
}
