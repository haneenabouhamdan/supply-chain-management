import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Role } from '../entities';
import { RoleFilterArgs } from '../dtos/acl.dto';
import { RoleFilter } from '../filters';

@Injectable()
export class RoleRepository extends BaseRepository<Role, RoleFilterArgs> {
  constructor(
    private dataSource: DataSource,
    private roleFilter: RoleFilter,
  ) {
    super(Role, dataSource);
  }
}
