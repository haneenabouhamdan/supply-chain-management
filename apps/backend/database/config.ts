import { Table } from 'typeorm';
import { IColumn, ColumnTypes } from './type';

export const defaultTableConfig = (tableName: string, columns: IColumn[]) => {
  const preDefinedColumns: IColumn[] = [
    {
      name: 'id',
      type: ColumnTypes.uuid,
      isUnique: true,
      isPrimary: true,
      isNullable: false,
      default: 'uuid_generate_v4()',
    },
    {
      name: 'created_at',
      type: ColumnTypes.timestamp,
      isNullable: false,
      default: 'now()',
    },
    {
      name: 'updated_at',
      type: ColumnTypes.timestamp,
      isNullable: false,
      default: 'now()',
    },
    {
      name: 'deleted_at',
      type: ColumnTypes.timestamp,
      isNullable: true,
    },
  ];

  return new Table({
    name: tableName,
    columns: [...preDefinedColumns, ...columns],
  });
};
