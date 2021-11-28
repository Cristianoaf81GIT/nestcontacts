import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contact } from './entities/contact.entity';
import { ContactService } from './services/contact.service';
import { ContactsController } from './controllers/contacts/contacts.controller';

@Module({
  imports: [SequelizeModule.forFeature([Contact])],
  providers: [ContactService],
  controllers: [ContactsController],
})
export class ContactsModule {}
