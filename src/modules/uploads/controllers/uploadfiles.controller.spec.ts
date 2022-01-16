import {
  BadRequestException,
  PreconditionFailedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from '../services/uploads.service';
import { UploadfilesController } from './uploadfiles.controller';

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

const mockedUser = {
  id: 1,
  fullName: 'joey',
  contacts: [],
};

const mockedRequest = {
  user: { ...mockedUser, userId: mockedUser.id },
};

// continue here
describe('UploadfilesController', () => {
  let controller: UploadfilesController;
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadfilesController],
      providers: [
        {
          provide: UploadsService,
          useValue: {
            handleUploadAvatarFile: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UploadfilesController>(UploadfilesController);
    service = module.get<UploadsService>(UploadsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should throw an exception when file parameter is null or undefined', async () => {
    const expectedResult = new PreconditionFailedException(
      'Avatar file is required!',
    );

    jest
      .spyOn(service, 'handleUploadAvatarFile')
      .mockRejectedValueOnce(expectedResult);

    await expect(
      controller.uploadUserContactAvatar(1, mockedRequest, mockedMulterFile),
    ).rejects.toThrowError(expectedResult);
  });

  it('should throw an exception when try to upload file with invalid user id', async () => {
    jest
      .spyOn(service, 'handleUploadAvatarFile')
      .mockRejectedValueOnce(new BadRequestException('user not found'));
    await expect(
      controller.uploadUserContactAvatar(1, mockedRequest, mockedMulterFile),
    ).rejects.toThrowError(new BadRequestException('user not found'));
  });

  it('should throw an exception when try to upload a file with invalid contact id', async () => {
    jest
      .spyOn(service, 'handleUploadAvatarFile')
      .mockRejectedValueOnce(new BadRequestException('Contact not found!'));

    await expect(
      controller.uploadUserContactAvatar(0, mockedRequest, mockedMulterFile),
    ).rejects.toThrowError(new BadRequestException('Contact not found!'));
  });

  it('should throw an exception when try to upload a file to an contact that does not belongs to user', async () => {
    const expectedResult = new BadRequestException(
      `you dont have permission to change this contact 0`,
    );

    jest
      .spyOn(service, 'handleUploadAvatarFile')
      .mockRejectedValueOnce(expectedResult);

    await expect(
      controller.uploadUserContactAvatar(0, mockedRequest, mockedMulterFile),
    ).rejects.toThrowError(expectedResult);
  });

  it('should successfull upload a file', async () => {
    const expectedResult = {
      message: `file: ${mockedMulterFile.originalname}, successfully uploaded!`,
    };
    jest
      .spyOn(service, 'handleUploadAvatarFile')
      .mockResolvedValueOnce(expectedResult);

    await expect(
      controller.uploadUserContactAvatar(1, mockedRequest, mockedMulterFile),
    );
  });
});
