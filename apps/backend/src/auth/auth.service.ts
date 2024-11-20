import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, User, UserService } from '../components/user';
import * as argon2 from 'argon2';
import { TokenService } from 'src/components/user/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  private async validateUserCredentials(
    identifier: string,
    pass: string,
  ): Promise<User> {
    const user = identifier.includes('@')
      ? await this.userService.findOneByEmail(identifier)
      : await this.userService.findOneByPhone(identifier);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid =
      user.password && (await argon2.verify(user.password, pass));
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async generateToken(user: User): Promise<string> {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.signAsync(payload);
  }

  private getTokenExpiryDate(days: number = 7): Date {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);
    return expiresAt;
  }

  async signIn(
    identifier: string,
    pass: string,
  ): Promise<{ token: string; user: User }> {
    const user = await this.validateUserCredentials(identifier, pass);
    const token = await this.generateToken(user);

    // Save token to the database
    const expiresAt = this.getTokenExpiryDate();
    await this.tokenService.saveToken(user.id, token, expiresAt);

    return { token, user };
  }

  async signUp(
    createUserPayload: CreateUserDto,
  ): Promise<{ token: string; user: User }> {
    const { phoneNumber, password } = createUserPayload;

    if (phoneNumber) {
      const existingUser = await this.userService.findOneByPhone(phoneNumber);
      if (existingUser) {
        throw new BadRequestException(
          'User with this phone number already exists',
        );
      }
    }

    const hashedPassword = await argon2.hash(password);

    const user = await this.userService.create({
      ...createUserPayload,
      password: hashedPassword,
    });

    const token = await this.generateToken(user);

    // Save token to the database
    const expiresAt = this.getTokenExpiryDate();
    await this.tokenService.saveToken(user.id, token, expiresAt);

    return { token, user };
  }

  async logout(userId: UUID): Promise<void> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.tokenService.deleteTokensByUserId(userId);
    console.log(`All tokens for user ID ${userId} have been deleted.`);
  }
}
