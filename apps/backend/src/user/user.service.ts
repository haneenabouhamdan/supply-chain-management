import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    return await this.userRepository.save(user);
  }

  async findOneByEmailOrPhone(
    email: string,
    phoneNumber: string,
  ): Promise<Nullable<User>> {
    return this.userRepository.findOneBy([{ email }, { phoneNumber }]);
  }

  // Get all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Get a single user by ID
  async findOne(id: UUID): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Update a user by ID
  async update(id: UUID, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    this.userRepository.merge(user, updateUserInput);
    return this.userRepository.save(user);
  }

  // Remove a user by ID
  async remove(id: UUID): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) throw new BadRequestException('User not found');
    const { affected } = await this.userRepository.delete(id);
    return affected === 1;
  }
}
