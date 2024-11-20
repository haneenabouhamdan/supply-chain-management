import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { User } from '../entities';
import { UserFilter } from '../filters';
import { UserFilterArgs } from '../dtos';

@Injectable()
export class UserRepository extends BaseRepository<User, UserFilterArgs> {
  constructor(
    private dataSource: DataSource,
    private userFilter: UserFilter,
  ) {
    super(User, dataSource);

    this.setFilter(userFilter);
  }
}
