import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from '../entities/contact.entity';
import * as faker from 'faker';
import { ContactDTO } from '../dtos/contact.dto';

@Injectable()
export class ContactSeeder {
  private logger = new Logger(ContactSeeder.name);

  constructor(@InjectModel(Contact) private contactModel: typeof Contact) {}

  async seed(quantity: number): Promise<any> {
    this.logger.debug(`starting seed contacts with: ${quantity} contacts`);
    const contacts = [];
    for (let i = 0; i < quantity; i += 1) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const contact: ContactDTO = {
        name: `${firstName} ${lastName}`,
        email: `${faker.internet.email(firstName, lastName, 'acme')}`,
        phone: `${faker.phone.phoneNumber('(99) 99999-9999')}`,
        avatar: `${faker.image.avatar()}`,
      };
      contacts.push(contact);
    }
    return await this.contactModel.bulkCreate(contacts);
  }
}
