import { ColumnTypes, IColumn } from '../type';

export const orderItemColumns: IColumn[] = [
  {
    name: 'order_id',
    type: ColumnTypes.int,
    isNullable: false,
  },
  {
    name: 'product_id',
    type: ColumnTypes.int,
    isNullable: false,
  },
  {
    name: 'quantity',
    type: ColumnTypes.int,
    isNullable: false,
    default: 1,
  },
];
