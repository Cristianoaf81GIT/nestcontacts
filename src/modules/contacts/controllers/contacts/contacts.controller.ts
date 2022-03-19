import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/strategies/jwt-auth.guard';
import { PaginatedResponse } from '../../../../utils/paginated.response';
import { ContactDTO } from '../../dtos/contact.dto';
import { ContactPaginatedQuery } from '../../dtos/contact.paginated.query';
import { ContactPaginatedResponseDto } from '../../dtos/contact.paginated.response';
import { ContactResponseDTO } from '../../dtos/contact.response.dto';
import { Contact } from '../../entities/contact.entity';
import { ContactService } from '../../services/contact.service';

@Controller('contacts')
@ApiTags('contacts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Create a contact' })
  @ApiCreatedResponse({
    description: 'success',
    type: ContactResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'user with id: [userId] does not exists',
  })
  @ApiBadRequestResponse({
    description: 'contact email already in exists',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Body() contactDto: ContactDTO,
    @Request() req,
  ): Promise<Contact> {
    return await this.contactService.create(contactDto, req.user.userId);
  }

  @Get('user')
  @ApiOperation({ summary: 'Get user contacts paginated' })
  @ApiBadRequestResponse({
    description: 'params: limit and offset is mandatory!',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    type: ContactPaginatedResponseDto,
  })
  @ApiNotFoundResponse({ description: 'user with id: [userId] was not found!' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getAll(
    @Query() params: ContactPaginatedQuery,
    @Request() req,
  ): Promise<PaginatedResponse> {
    return this.contactService.getAll(params, req.user.userId);
  }
}
