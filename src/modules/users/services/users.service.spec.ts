import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

const userDTO: UserDto = {
  email: 'user@email.com',
  fullName: 'user',
  password: '123456',
};

const existingUser: any = {
  id: 1,
  fullName: 'user',
  email: 'user@email.com',
  contacts: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

describe('UsersService', () => {
  let service: UsersService;
  let model: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should throw badRequestException when try to create a new user with repeated email', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValueOnce(existingUser as User);
    await expect(service.create(userDTO)).rejects.toThrowError(
      new BadRequestException('user already exists'),
    );
  });

  it('Should successfuly create a new user', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(userDTO as User);
    await expect(service.create(userDTO)).resolves.toEqual(userDTO);
  });

  it('Should throw an NotFoundException when try to find user with invalid email address', async () => {
    const error = new NotFoundException('user not found');
    jest.spyOn(model, 'findOne').mockRejectedValueOnce(error);

    await expect(service.getUser('noemail@email.com')).rejects.toThrowError(
      error,
    );
  });

  it('Should return a valid user when try to login with valid User email', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValueOnce(userDTO);
    await expect(service.getUser(userDTO.email)).resolves.toEqual(userDTO);
  });

  it('Should return a NotFoundException when try find user by unexistent id', async () => {
    jest.spyOn(model, 'findOne').mockRejectedValueOnce(new NotFoundException());
    await expect(service.getUserById(30)).rejects.toThrowError(
      new NotFoundException(),
    );
  });

  it('Should return a existing user when try to find it by id', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValueOnce(existingUser);
    await expect(service.getUserById(1)).resolves.toEqual(existingUser);
  });
});
