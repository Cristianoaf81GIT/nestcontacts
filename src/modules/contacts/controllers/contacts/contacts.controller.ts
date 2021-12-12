import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/strategies/jwt-auth.guard';
import { PaginatedResponse } from '../../../../utils/paginated.response';
import { ContactDTO } from '../../dtos/contact.dto';
import { ContactPaginatedQuery } from '../../dtos/contact.paginated.query';
import { Contact } from '../../entities/contact.entity';
import { ContactService } from '../../services/contact.service';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactService: ContactService) {}
  @Post()
  async create(
    @Body() contactDto: ContactDTO,
    @Request() req,
  ): Promise<Contact> {
    return await this.contactService.create(contactDto, req.user.userId);
  }

  @Get('user')
  async getAll(
    @Query() params: ContactPaginatedQuery,
    @Request() req,
  ): Promise<PaginatedResponse> {
    return this.contactService.getAll(params, req.user.userId);
  }
}
