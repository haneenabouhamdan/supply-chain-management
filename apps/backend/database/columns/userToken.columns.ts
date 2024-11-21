import { ColumnTypes, IColumn } from '../type';

export const userTokenColumns: IColumn[] = [
  {
    name: 'user_id',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
  {
    name: 'refresh_token',
    type: ColumnTypes.text,
    isNullable: false,
  },
  {
    name: 'expires_at',
    type: ColumnTypes.timestamp,
    isNullable: false,
  },
];
