import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './entities/contact.entity';
import { ContactService } from './services/contact.service';
import { ContactsController } from './controllers/contacts/contacts.controller';
import { UserContact } from '../users/entities/userContact.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Contact, User, UserContact])],
  providers: [ContactService],
  controllers: [ContactsController],
})
export class ContactsModule {}
