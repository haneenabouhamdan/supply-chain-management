import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { v4 as uuidv4 } from 'uuid';
import { UserStatus } from './enums';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  };

  const id: UUID = uuidv4() as UUID;
  const sampleUser: User = {
    id,
    username: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    password: 'password123',
    profilePicture: null,
    status: 'ACTIVE',
    dateOfBirth: null,
    supplierId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save a user', async () => {
      mockUserRepository.create.mockReturnValue(sampleUser);
      mockUserRepository.save.mockResolvedValue(sampleUser);

      const createUserInput: CreateUserInput = {
        username: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        password: 'password123',
        profilePicture: null,
        status: UserStatus.ACTIVE,
        dateOfBirth: null,
        supplierId: null,
      };

      const result = await service.create(createUserInput);
      expect(userRepository.create).toHaveBeenCalledWith(createUserInput);
      expect(userRepository.save).toHaveBeenCalledWith(sampleUser);
      expect(result).toEqual(sampleUser);
    });
  });

  describe('findOneByEmailOrPhone', () => {
    it('should find a user by email or phone number', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(sampleUser);

      const result = await service.findOneByEmailOrPhone(
        'john.doe@example.com',
        '1234567890',
      );

      expect(userRepository.findOneBy).toHaveBeenCalledWith([
        { email: 'john.doe@example.com' },
        { phoneNumber: '1234567890' },
      ]);
      expect(result).toEqual(sampleUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      mockUserRepository.find.mockResolvedValue([sampleUser]);

      const result = await service.findAll();
      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual([sampleUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      mockUserRepository.findOne.mockResolvedValue(sampleUser);

      const result = await service.findOne(id);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: id },
      });
      expect(result).toEqual(sampleUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      mockUserRepository.findOne.mockResolvedValue(sampleUser);
      mockUserRepository.save.mockResolvedValue(sampleUser);

      const updateUserInput: UpdateUserInput = {
        id,
        username: 'John Updated',
        email: 'john.updated@example.com',
      };

      const result = await service.update(id, updateUserInput);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(userRepository.merge).toHaveBeenCalledWith(
        sampleUser,
        updateUserInput,
      );
      expect(userRepository.save).toHaveBeenCalledWith(sampleUser);
      expect(result).toEqual(sampleUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      const updateUserInput: UpdateUserInput = {
        id,
        username: 'John Updated',
        email: 'john.updated@example.com',
      };

      await expect(service.update(id, updateUserInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      mockUserRepository.findOne.mockResolvedValue(sampleUser);
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(id);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(userRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual(true);
    });

    it('should throw BadRequestException if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(BadRequestException);
    });

    it('should return false if delete operation fails', async () => {
      mockUserRepository.findOne.mockResolvedValue(sampleUser);
      mockUserRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove(id);
      expect(result).toEqual(false);
    });
  });
});
