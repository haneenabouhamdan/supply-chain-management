import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { Permission } from '../entities';

@Injectable()
export class PermisionRepository extends BaseRepository<Permission> {
  constructor(private dataSource: DataSource) {
    super(Permission, dataSource);
  }
}
