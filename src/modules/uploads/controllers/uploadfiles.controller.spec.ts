import { ArgumentMetadata, PreconditionFailedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomParseIntPipe } from '../pipes/custom-parseInt.pipe';
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

const mockedArgumentMetaData: ArgumentMetadata = {
  type: 'query',
  data: '1',
};

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
            handleUploadAvatarFile: jest.fn().mockReturnValue({}),
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

  it('should upload single file with success', () => {
    const result = controller.uploadUserContactAvatar(0, mockedMulterFile);
    expect(result).toEqual({});
  });

  it('should throw an exception when file parameter is undefined or null', () => {
    try {
      jest
        .spyOn(service, 'handleUploadAvatarFile')
        .mockImplementationOnce(
          (_id: number, file: Express.Multer.File): any => {
            if (!file) throw new PreconditionFailedException();
          },
        );
      controller.uploadUserContactAvatar(1, null);
    } catch (error) {
      expect(error).toEqual(new PreconditionFailedException());
    }
  });

  it('should throw an exception when user id is negative or zero', () => {
    jest
      .spyOn(controller, 'uploadUserContactAvatar')
      .mockImplementationOnce((_id: number): any => {
        new CustomParseIntPipe().transform(String(_id), mockedArgumentMetaData);
      });
    try {
      controller.uploadUserContactAvatar(0, null);
    } catch (error) {
      expect(error.message).toEqual(
        'id must be a valid number non negative and greather than zero!',
      );
    }
  });
});
