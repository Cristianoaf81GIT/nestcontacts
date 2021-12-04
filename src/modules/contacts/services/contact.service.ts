import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactDTO } from '../dtos/contact.dto';
import { Contact } from '../entities/contact.entity';
import { attributes } from '../config/model.attributes';
import { ContactPaginatedQuery } from '../dtos/contact.paginated.query';
import { PaginatedResponse } from '../../../utils/paginated.response';
import { User } from '../../users/entities/user.entity';
import { UserContact } from 'src/modules/users/entities/userContact.entity';

@Injectable()
export class ContactService {
  private logger = new Logger(ContactService.name);

  constructor(
    @InjectModel(Contact) private ContactModel: typeof Contact,
    @InjectModel(User) private UserModel: typeof User,
    @InjectModel(UserContact) private UserContactModel: typeof UserContact,
  ) {}

  async create(
    contactDTO: ContactDTO,
    userId: number,
  ): Promise<Contact | void> {
    const userExists = await this.UserModel.findOne({
      where: { id: userId },
      include: ['contacts'],
    });

    if (!userExists)
      throw new BadRequestException(`user with id: ${userId} does not exists`);

    const contactAlreadyExists = [];
    userExists.contacts.forEach((contact) => {
      if (contact.email === contactDTO.email) {
        contactAlreadyExists.push(contact);
      }
    });

    if (contactAlreadyExists.length > 0) {
      this.logger.verbose(
        `contact already existing with this email: ${contactDTO.email}`,
      );
      throw new BadRequestException('contact email already in exists');
    }
    this.logger.verbose(`a new contact is arriving: ${contactDTO.email}`);

    const newContact = await this.ContactModel.create(contactDTO);
    await this.UserContactModel.create({
      userId: userExists.id,
      contactId: newContact.id,
    });
    return newContact;
  }

  async getAll(
    params: ContactPaginatedQuery,
    userId: number,
  ): Promise<PaginatedResponse> {
    if (!params.limit && !params.offset)
      throw new BadRequestException('params: limit and offset is mandatory!');

    const existingUser = await this.UserModel.findOne({
      where: { id: userId },
      include: ['contacts'],
    });

    if (!existingUser) {
      throw new BadRequestException(`user with id: ${userId} was not found!`);
    }

    const userContacts = [];
    let count = 0;
    await this.UserContactModel.findAndCountAll({
      where: { userId: userId },
      limit: params.limit,
      offset: params.offset,
    }).then(async (values) => {
      for (const contact of values.rows) {
        count = values.count;
        const userContact = await this.ContactModel.findOne({
          where: { id: contact.contactId },
        });
        userContacts.push(userContact);
      }
    });

    return {
      count,
      rows: userContacts,
    };
  }

  async getContactByEmail(email: string): Promise<Contact> {
    return this.ContactModel.findOne({ where: { email }, attributes });
  }
}
