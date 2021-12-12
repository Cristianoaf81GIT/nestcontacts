import {
  BadRequestException,
  Injectable,
  Logger,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { format } from 'date-fns';
import { ContactService } from '../../contacts/services/contact.service';
import { UserContact } from '../../users/entities/userContact.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class UploadsService {
  private logger = new Logger(UploadsService.name);

  constructor(
    private userService: UsersService,
    private contactService: ContactService,
    @InjectModel(UserContact) userContactModel: typeof UserContact,
  ) {}

  async handleUploadAvatarFile(
    userId: number,
    contactId: number,
    file: Express.Multer.File,
  ): Promise<any> {
    let userOwnerContact = false;
    if (!file || !file.originalname)
      throw new PreconditionFailedException('Avatar file is required!');

    // find user
    const user = await this.userService.getUserById(userId);

    if (!user || !user.id) throw new BadRequestException('user not found');

    // find contact
    const contact = await this.contactService.getContactById(contactId);
    if (!contact || !contact.id)
      throw new BadRequestException('Contact not found!');

    // check if user is owner contact
    user.contacts.forEach((userContact) => {
      if (userContact.id === contactId) userOwnerContact = true;
    });
    console.log(userOwnerContact, 'o contato é do usuario');
    if (!userOwnerContact)
      throw new BadRequestException(
        `you dont have permission to change this contact ${contactId}`,
      );

    this.logger.verbose(
      `file: ${file.originalname} was uploaded, ${format(
        new Date(),
        'yyyy-MM-dd HH:mm:ss.SS',
      )} by userId ${userId}`,
    );
    return { message: `file: ${file.originalname}, successfully uploaded!` };
  }
}
