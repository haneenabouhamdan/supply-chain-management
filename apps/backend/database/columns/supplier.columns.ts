import { ColumnTypes, IColumn } from '../type';

export const supplierColumns: IColumn[] = [
  {
    name: 'name',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'email',
    type: ColumnTypes.varchar,
    isUnique: true,
    isNullable: false,
  },
  {
    name: 'phone',
    type: ColumnTypes.varchar,
    isNullable: true,
  },
  {
    name: 'address',
    type: ColumnTypes.text,
    isNullable: true,
  },
];
