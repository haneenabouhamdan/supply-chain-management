export enum TableNames {
  users = 'users',
  roles = 'roles',
  permissions = 'permissions',
  rolePermissions = 'role_permissions',
}

export enum ColumnTypes {
  boolean = 'boolean',
  varchar = 'varchar',
  text = 'text',
  uuid = 'uuid',
  json = 'json',
  timestamp = 'timestamp',
  date = 'date',
  time = 'time',
  float = 'float8',
  int = 'int8',
  enum = 'enum',
  smallint = 'int2',
  decimal = 'decimal',
}

export interface IColumn {
  name: string;
  type: string;
  length?: string;
  isUnique?: boolean;
  isPrimary?: boolean;
  enum?: string[];
  default?: any;
  isNullable: boolean;
  isArray?: boolean;
}

export const DATABASE_ENUMS_NAMES = Object.freeze({
  roles: 'roles_enum',
  userStatus: 'user_status_enum',
});

export const DATABASE_ENUMS = Object.freeze({
  roles: [
    'SUPER_ADMIN',
    'ADMIN',
    'DISPATCHER',
    'ACCOUNT_MANAGER',
    'CUSTOMER',
    'RETAILER',
  ],
  userStatus: ['PENDING', 'ACTIVE', 'INACTIVE'],
});
