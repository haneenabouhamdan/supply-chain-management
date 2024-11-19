import { ColumnTypes, IColumn } from '../type';

export const permissionColumns: IColumn[] = [
  {
    name: 'name',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'is_revoked',
    type: ColumnTypes.boolean,
    default: false,
    isNullable: false,
  },
];
