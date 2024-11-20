import { BaseFilter } from 'src/common/repositories';
import { SelectQueryBuilder } from 'typeorm';
import { RoleFilterArgs } from '../dtos/acl.dto';
import { Role } from '../entities';

export class RoleFilter extends BaseFilter<Role, RoleFilterArgs> {
  protected simpleFilters: Array<keyof Role> = ['id', 'name'];
  protected sortable: Array<keyof Role> = ['id', 'name', 'createdAt'];

  applyCustomFilters(filters: RoleFilterArgs): SelectQueryBuilder<Role> {
    if (filters.withPermissions) {
      this.query.leftJoinAndSelect(`${this.alias}.permissions`, 'permissions');
    }

    if (filters.userId) {
      this.query
        .innerJoin(`${this.alias}.users`, 'user')
        .where('user.id = :userId', { userId: filters.userId });
    }

    return this.query;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCustomSort(_: RoleFilterArgs): BaseFilter<Role, RoleFilterArgs> {
    return this;
  }
}
