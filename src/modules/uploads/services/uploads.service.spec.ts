import { PreconditionFailedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UploadsService } from './uploads.service';

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

describe('UploadsService', () => {
  let service: UploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UploadsService,
          useValue: {
            handleUploadAvatarFile: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UploadsService>(UploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully upload file', () => {
    const result = service.handleUploadAvatarFile(1, mockedMulterFile);
    expect(JSON.stringify(result)).toEqual('{}');
  });

  it('should throw an exception when file is empty', () => {
    jest
      .spyOn(service, 'handleUploadAvatarFile')
      .mockImplementationOnce((_id: number, file: Express.Multer.File): any => {
        if (!file) throw new PreconditionFailedException();
      });
    try {
      service.handleUploadAvatarFile(0, null);
    } catch (error) {
      expect(error).toEqual(new PreconditionFailedException());
    }
  });
});
