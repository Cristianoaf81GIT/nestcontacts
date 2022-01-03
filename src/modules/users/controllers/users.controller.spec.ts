import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';
import { UserDto } from '../dto/user.dto';
import { BadRequestException } from '@nestjs/common';

const userDTO: UserDto = {
  fullName: 'user',
  email: 'user@email.com',
  password: '123456',
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should successfuly create a new user', async () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce(userDTO as any);
    await expect(controller.create(userDTO)).resolves.toEqual(userDTO);
  });

  it('should throw an badRequestException when try to create a new user', async () => {
    jest
      .spyOn(service, 'create')
      .mockRejectedValueOnce(new BadRequestException());
    await expect(controller.create(userDTO)).rejects.toEqual(
      new BadRequestException(),
    );
  });
});
