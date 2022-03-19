import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { format } from 'date-fns';
import { ContactService } from '../../contacts/services/contact.service';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class UploadsService {
  private logger = new Logger(UploadsService.name);

  constructor(
    private userService: UsersService,
    private contactService: ContactService,
  ) {}

  async handleUploadAvatarFile(
    userId: number,
    contactId: number,
    file: Express.Multer.File,
  ): Promise<any> {
    let userOwnerContact = false;
    if (!file || !file.originalname)
      throw new PreconditionFailedException('Avatar file is required!');

    const user = await this.userService.getUserById(userId);

    if (!user || !user.id) throw new NotFoundException('user not found');

    const contact = await this.contactService.getContactById(contactId);
    if (!contact || !contact.id)
      throw new NotFoundException('Contact not found!');

    user.contacts.forEach((userContact) => {
      if (userContact.id === contactId) {
        userOwnerContact = true;
      }
    });

    if (!userOwnerContact)
      throw new BadRequestException(
        `you dont have permission to change this contact ${contactId}`,
      );

    this.contactService.updateUserAvatar(contact.id, file.filename);

    this.logger.verbose(
      `file: ${file.originalname} was uploaded, ${format(
        new Date(),
        'yyyy-MM-dd HH:mm:ss.SS',
      )} by userId ${userId}`,
    );
    return {
      message: `file: [http://localhost:9000/${file.filename}], successfully uploaded!`,
    };
  }
}
