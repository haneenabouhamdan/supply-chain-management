import { BaseFilter } from 'src/common/repositories';
import { SelectQueryBuilder } from 'typeorm';
import { User } from '../entities';
import { UserFilterArgs } from '../dtos';

export class UserFilter extends BaseFilter<User, UserFilterArgs> {
  protected simpleFilters: Array<keyof User> = [
    'id',
    'phoneNumber',
    'email',
    'status',
  ];

  protected sortable: Array<keyof User> = ['status', 'createdAt'];

  applyCustomFilters(filters: UserFilterArgs): SelectQueryBuilder<User> {
    if (filters.roles || filters.excludeRoles) {
      this.query.innerJoin(`${this.alias}.roles`, 'role');
    }

    if (filters.roles) {
      this.query.andWhere('role.name IN(:...roleNames)', {
        roleNames: filters.roles,
      });
    }

    if (filters.excludeRoles) {
      this.query.andWhere('role.name Not IN(:...excludeRoles)', {
        excludeRoles: filters.excludeRoles,
      });
    }

    if (filters.keyword) {
      this.query
        .andWhere(`LOWER(${this.alias}.name) like :username`, {
          username: `%${filters.keyword.toLowerCase()}%`,
        })
        .orWhere(`LOWER(${this.alias}.phone) like :userPhone`, {
          userPhone: `%${filters.keyword.toLowerCase()}%`,
        })
        .orWhere(`LOWER(${this.alias}.email) like :userEmail`, {
          userEmail: `%${filters.keyword.toLowerCase()}%`,
        });
    }

    if (filters.permissions) {
      this.query
        .innerJoin(`${this.alias}.permissions`, 'permission')
        .andWhere('permission.name IN(:...permissionNames)', {
          permissionNames: filters.permissions,
        });
    }

    return this.query;
  }

  applyCustomSort(filters: UserFilterArgs): BaseFilter<User, UserFilterArgs> {
    console.log(filters);
    return this;
  }

  //this method is implemented in the baseFilter
  //it checks if the keyword matches any column in the table,
  //but it issues an error when it checks if the keyword matches the id
  //(because they have different types) so I had to overwrite it
  applySearch(filters: UserFilterArgs): BaseFilter<User, UserFilterArgs> {
    console.log(filters);
    return this;
  }
}
