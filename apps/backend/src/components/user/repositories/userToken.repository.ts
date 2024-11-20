import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { UserToken } from '../entities';

@Injectable()
export class UserTokenRepository extends BaseRepository<UserToken> {
  constructor(private dataSource: DataSource) {
    super(UserToken, dataSource);
  }
}
