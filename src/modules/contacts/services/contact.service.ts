import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactDTO } from '../dtos/contact.dto';
import { Contact } from '../entities/contact.entity';

@Injectable()
export class ContactService {
  private logger = new Logger(ContactService.name);

  constructor(@InjectModel(Contact) private ContactModel: typeof Contact) {}

  async create(contactDTO: ContactDTO): Promise<Contact> {
    const existingUser = this.getContactByEmail(contactDTO.email);
    if (existingUser) {
      this.logger.verbose(
        `contact already existing with this email: ${contactDTO.email}`,
      );
      throw new BadRequestException('user email already in use!');
    }
    this.logger.verbose(`a new contact is arriving: ${contactDTO.email}`);
    return this.ContactModel.create(contactDTO);
  }

  async getAll(): Promise<Contact[]> {
    return this.ContactModel.findAll();
  }

  async getContactByEmail(email: string): Promise<Contact> {
    return this.ContactModel.findOne({ where: { email } });
  }
}
