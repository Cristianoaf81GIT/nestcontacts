import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactDTO } from '../dtos/contact.dto';
import { Contact } from '../entities/contact.entity';
import { attributes } from '../config/model.attributes';

@Injectable()
export class ContactService {
  private logger = new Logger(ContactService.name);

  constructor(@InjectModel(Contact) private ContactModel: typeof Contact) {}

  async create(contactDTO: ContactDTO): Promise<Contact> {
    const existingUser = await this.getContactByEmail(contactDTO.email);
    if (existingUser) {
      this.logger.verbose(
        `contact already existing with this email: ${existingUser.email}`,
      );
      throw new BadRequestException('user email already in use!');
    }
    this.logger.verbose(`a new contact is arriving: ${contactDTO.email}`);
    return await this.ContactModel.create(contactDTO, {
      fields: [...attributes],
    });
  }

  async getAll(): Promise<Contact[]> {
    return this.ContactModel.findAll({
      attributes,
    });
  }

  async getContactByEmail(email: string): Promise<Contact> {
    return this.ContactModel.findOne({ where: { email }, attributes });
  }
}
