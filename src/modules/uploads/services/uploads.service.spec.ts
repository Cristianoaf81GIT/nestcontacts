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

describe('UploadsService', () => {
  let uploadService: UploadsService;
  let usersService: UsersService;
  let contactService: ContactService;

  // repositories
  let userRepository: any;
  let contactRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UploadsService,
          useValue: {
            handleUploadAvatarFile: jest.fn().mockReturnValue({}),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getUserById: jest.fn(),
          },
        },
        {
          provide: ContactService,
          useValue: {
            getContactById: jest.fn(),
          },
        },
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
      ],
    }).compile();

    uploadService = module.get<UploadsService>(UploadsService);
    usersService = module.get<UsersService>(UsersService);
    contactService = module.get<ContactService>(ContactService);
    userRepository = module.get<User>(getModelToken(User));
    contactRepository = module.get<Contact>(getModelToken(Contact));
  });

  it('should be defined', () => {
    expect(uploadService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(contactService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(contactRepository).toBeDefined();
  });

  it('should throw an PreconditionFailed exception when no file was uploaded', async () => {
    jest
      .spyOn(uploadService, 'handleUploadAvatarFile')
      .mockRejectedValueOnce(preconditionException);
    await expect(
      uploadService.handleUploadAvatarFile(1, 1, null),
    ).rejects.toThrowError(preconditionException);
  });

  it('should throw a BadRequestException when user not found', async () => {
    jest
      .spyOn(userRepository, 'findOne')
      .mockRejectedValueOnce(userNotFoundException);

    jest
      .spyOn(uploadService, 'handleUploadAvatarFile')
      .mockRejectedValueOnce(userNotFoundException);

    await expect(
      uploadService.handleUploadAvatarFile(0, 0, mockedMulterFile),
    ).rejects.toThrowError(userNotFoundException);
  });
});
