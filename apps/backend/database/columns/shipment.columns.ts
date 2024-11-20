import { ColumnTypes, DATABASE_ENUMS, IColumn } from '../type';

export const shipmentColumns: IColumn[] = [
  {
    name: 'status',
    type: ColumnTypes.enum,
    enum: DATABASE_ENUMS.shipmentStatuses,
    default: "'CREATED'",
    isNullable: false,
  },
  {
    name: 'tracking_number',
    type: ColumnTypes.varchar,
    isUnique: true,
    isNullable: true,
  },
  {
    name: 'start_time',
    type: ColumnTypes.timestamp,
    isNullable: true,
  },
  {
    name: 'end_time',
    type: ColumnTypes.timestamp,
    isNullable: true,
  },
  {
    name: 'driver_id',
    type: ColumnTypes.int,
    isNullable: true,
  },
];
