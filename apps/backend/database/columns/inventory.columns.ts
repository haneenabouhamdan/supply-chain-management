import { ColumnTypes, IColumn } from '../type';

export const inventoryColumns: IColumn[] = [
  {
    name: 'product_id',
    type: ColumnTypes.int,
    isNullable: false,
  },
  {
    name: 'location',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'quantity',
    type: ColumnTypes.int,
    isNullable: false,
    default: 0,
  },
  {
    name: 'supplier_id',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
];
