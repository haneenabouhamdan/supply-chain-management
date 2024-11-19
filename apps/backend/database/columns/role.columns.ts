import { ColumnTypes, DATABASE_ENUMS, IColumn } from '../type';

export const roleColumns: IColumn[] = [
  {
    name: 'name',
    type: ColumnTypes.enum,
    isNullable: false,
    enum: DATABASE_ENUMS.roles,
  },
];
