import { Test, TestingModule } from '@nestjs/testing';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { v4 as uuidv4 } from 'uuid';
import { UserStatus } from './enums';
import { UserResolver } from 'src/components/user';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  const id: UUID = uuidv4() as UUID;
  const sampleUser: User = {
    id,
    username: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    password: 'password123',
    profilePicture: null,
    status: UserStatus.ACTIVE,
    supplierId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findOneByEmailOrPhone: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUserService.findAll.mockResolvedValue([sampleUser]);

      const result = await resolver.findAll();
      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toEqual([sampleUser]);
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      mockUserService.findOne.mockResolvedValue(sampleUser);

      const result = await resolver.findOne(id);
      expect(userService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(sampleUser);
    });

    it('should throw an error if user is not found', async () => {
      mockUserService.findOne.mockRejectedValue(new Error('User not found'));

      await expect(resolver.findOne(id)).rejects.toThrow('User not found');
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      mockUserService.create.mockResolvedValue(sampleUser);

      const createUserInput: CreateUserInput = {
        username: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        profilePicture: null,
        status: UserStatus.ACTIVE,
        supplierId: null,
      };

      const result = await resolver.createUser(createUserInput);
      expect(userService.create).toHaveBeenCalledWith(createUserInput);
      expect(result).toEqual(sampleUser);
    });
  });

  describe('updateUser', () => {
    it('should update and return the updated user', async () => {
      mockUserService.update.mockResolvedValue(sampleUser);

      const updateUserInput: UpdateUserInput = {
        id,
        username: 'John Updated',
        email: 'john.updated@example.com',
      };

      const result = await resolver.updateUser(updateUserInput);
      expect(userService.update).toHaveBeenCalledWith(id, updateUserInput);
      expect(result).toEqual(sampleUser);
    });

    it('should throw an error if user is not found', async () => {
      mockUserService.update.mockRejectedValue(new Error('User not found'));

      const updateUserInput: UpdateUserInput = {
        id,
        username: 'John Updated',
        email: 'john.updated@example.com',
      };

      await expect(resolver.updateUser(updateUserInput)).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('removeUser', () => {
    it('should remove a user and return true', async () => {
      mockUserService.remove.mockResolvedValue(true);

      const result = await resolver.removeUser(id);
      expect(userService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(true);
    });

    it('should return false if user removal fails', async () => {
      mockUserService.remove.mockResolvedValue(false);

      const result = await resolver.removeUser(id);
      expect(userService.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(false);
    });
  });
});
