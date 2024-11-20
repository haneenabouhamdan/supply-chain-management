import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { User, UserToken } from '../entities';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTokenRepository } from '../repositories';
import { In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private userTokenRepository: UserTokenRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneById(id: UUID): Promise<Nullable<User>> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmailOrPhone(
    email: string,
    phoneNumber: string,
  ): Promise<Nullable<User>> {
    return this.userRepository.findOneBy([{ email }, { phoneNumber }]);
  }

  async findOneByPhone(phoneNumber: string): Promise<Nullable<User>> {
    return this.userRepository.findOneBy({ phoneNumber });
  }

  async findOneByEmail(email: string): Promise<Nullable<User>> {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.email ILIKE :email', { email: `%${email}%` })
      .getOne();
  }

  async getUsersByEmails(email: string[]): Promise<Nullable<User[]>> {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.email ILIKE :email', { email: `%${email}%` })
      .getMany();
  }

  async create(payload: CreateUserDto): Promise<User> {
    const user = await this.findOneByEmailOrPhone(
      payload.email ?? '',
      payload.phoneNumber ?? '',
    );

    if (user) {
      throw new BadGatewayException('user already exists');
    }
    if (!payload.password) {
      throw new BadRequestException('Please provide password');
    }

    const hashedPassword = await argon2.hash(payload.password);
    payload.password = hashedPassword;
    return this.userRepository.save(payload);
  }

  async update(UpdateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(UpdateUserDto.id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (UpdateUserDto.password) {
      UpdateUserDto.password = await argon2.hash(UpdateUserDto.password);
    }

    this.userRepository.merge(user, UpdateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: UUID): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getById(id: UUID) {
    return this.userRepository.findOneBy({ id });
  }

  async getByIds(ids: UUID[]) {
    return this.userRepository.find({ where: { id: In(ids) } });
  }

  async updateById(id: UUID, dto: UpdateUserDto) {
    await this.userRepository.update(id, dto);
    return this.getById(id);
  }

  async saveFirebaseToken(userId: UUID, token: string): Promise<UserToken> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    const existingToken = await this.userTokenRepository.findOneBy({
      userId: user.id,
    });

    if (existingToken) {
      existingToken.token = token;
      return this.userTokenRepository.save(existingToken);
    } else {
      const newUserToken = this.userTokenRepository.create({
        userId: user.id,
        token,
      });
      return this.userTokenRepository.save(newUserToken);
    }
  }

  async getFirebaseToken(userId: UUID): Promise<Nullable<UserToken>> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userTokenRepository.findOneBy({ userId });
  }
}
