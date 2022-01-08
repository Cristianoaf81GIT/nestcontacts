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
});
