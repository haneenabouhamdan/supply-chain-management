import { ColumnTypes, IColumn } from '../type';

export const productColumns: IColumn[] = [
  {
    name: 'sku',
    type: ColumnTypes.varchar,
    isUnique: true,
    isNullable: false,
  },
  {
    name: 'name',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'description',
    type: ColumnTypes.text,
    isNullable: true,
  },
  {
    name: 'price',
    type: ColumnTypes.decimal,
    isNullable: false,
  },
  {
    name: 'threshold',
    type: ColumnTypes.int,
    isNullable: false,
    default: 10,
  },
  {
    name: 'category',
    type: ColumnTypes.varchar,
    isNullable: true,
  },
];
