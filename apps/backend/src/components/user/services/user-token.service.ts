import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from '../entities';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(UserToken)
    private tokenRepository: Repository<UserToken>,
  ) {}

  async saveToken(
    userId: UUID,
    token: string,
    expiresAt: Date,
  ): Promise<UserToken> {
    const tokenEntity = this.tokenRepository.create({
      userId,
      refreshToken: token,
      expiresAt,
    });
    return await this.tokenRepository.save(tokenEntity);
  }

  async deleteTokensByUserId(userId: UUID): Promise<void> {
    await this.tokenRepository.delete({ userId });
  }

  async findToken(token: string): Promise<UserToken | null> {
    return await this.tokenRepository.findOne({
      where: { refreshToken: token },
    });
  }
}
