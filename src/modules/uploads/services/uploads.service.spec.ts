import {
  BadRequestException,
  PreconditionFailedException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Contact } from '../../contacts/entities/contact.entity';
import { User } from '../../users/entities/user.entity';
import { ContactService } from '../../contacts/services/contact.service';
import { UsersService } from '../../users/services/users.service';
import { UploadsService } from './uploads.service';
import { UserContact } from '../../users/entities/userContact.entity';

// continuar aqui
const mockedMulterFile: Express.Multer.File = {
  buffer: Buffer.from(''),
  filename: 'awesome.jpg',
  destination: '',
  mimetype: 'image/jpg',
  fieldname: '',
  path: '',
  originalname: 'awesome.jpg',
  size: 2000,
  stream: null,
  encoding: '',
};

const preconditionException = new PreconditionFailedException(
  'Avatar file is required!',
);

const userNotFoundException = new BadRequestException('user not found');
const contactNotFoundException = new BadRequestException('Contact not found!');
const forbiddenContactExceptionMessage = `you dont have permission to change this contact $id`;

const user = {
  id: 1,
  contacts: [],
};

const contact = {
  id: 1,
};

describe('UploadsService', () => {
  let uploadService: UploadsService;
  let usersService: UsersService;
  let contactService: ContactService;

  // repositories
  let userRepository: any;
  let contactRepository: any;
  let userContactRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadsService,
        UsersService,
        ContactService,
        {
          provide: getModelToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getModelToken(Contact),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getModelToken(UserContact),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    uploadService = module.get<UploadsService>(UploadsService);
    usersService = module.get<UsersService>(UsersService);
    contactService = module.get<ContactService>(ContactService);
    userRepository = module.get<User>(getModelToken(User));
    contactRepository = module.get<Contact>(getModelToken(Contact));
    userContactRepository = module.get<UserContact>(getModelToken(UserContact));
  });

  it('should be defined', () => {
    expect(uploadService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(contactService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(contactRepository).toBeDefined();
    expect(userContactRepository).toBeDefined();
  });

  it('should throw an PreconditionFailed exception when no file was uploaded', async () => {
    await expect(
      uploadService.handleUploadAvatarFile(1, 1, null),
    ).rejects.toThrowError(preconditionException);
  });

  it('should throw an BadRequestException when try to upload file by invalid user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

    await expect(
      uploadService.handleUploadAvatarFile(0, 1, mockedMulterFile),
    ).rejects.toThrowError(userNotFoundException);
  });

  it('should throw an BadRequestException when try to upload a file with invalid contact id', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
    jest.spyOn(contactRepository, 'findOne').mockReturnValueOnce(undefined);
    await expect(
      uploadService.handleUploadAvatarFile(1, 0, mockedMulterFile),
    ).rejects.toThrowError(contactNotFoundException);
  });

  it('should trow a BadRequestException when user try to upload a file to an contact that not belongs to user', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
    jest.spyOn(contactRepository, 'findOne').mockReturnValueOnce(contact);
    const badRequestException = new BadRequestException(
      forbiddenContactExceptionMessage.replace('$id', `${contact.id}`),
    );
    await expect(
      uploadService.handleUploadAvatarFile(1, contact.id, mockedMulterFile),
    ).rejects.toThrowError(badRequestException);
  });

  it('should successfull upload a file', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValueOnce({ ...user, contacts: [contact] });
    jest.spyOn(contactRepository, 'findOne').mockReturnValueOnce(contact);
    const returnMessage = {
      message: `file: ${mockedMulterFile.originalname}, successfully uploaded!`,
    };
    await expect(
      uploadService.handleUploadAvatarFile(
        user.id,
        contact.id,
        mockedMulterFile,
      ),
    ).resolves.toEqual(returnMessage);
  });
});
