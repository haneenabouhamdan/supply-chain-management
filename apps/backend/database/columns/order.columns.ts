import { ColumnTypes, DATABASE_ENUMS, IColumn } from '../type';

export const orderColumns: IColumn[] = [
  {
    name: 'customer_id',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
  {
    name: 'status',
    type: ColumnTypes.enum,
    enum: DATABASE_ENUMS.orderStatuses,
    default: "'PENDING'",
    isNullable: false,
  },
  {
    name: 'payment_type',
    type: ColumnTypes.enum,
    enum: DATABASE_ENUMS.paymentStatuses,
    default: "'PREPAID'",
    isNullable: false,
  },
  {
    name: 'payment_amount',
    type: ColumnTypes.decimal,
    isNullable: false,
  },
  {
    name: 'supplier_id',
    type: ColumnTypes.uuid,
    isNullable: false,
  },
  {
    name: 'estimated_delivery_date',
    type: ColumnTypes.timestamp,
    isNullable: true,
  },
  {
    name: 'actual_delivery_date',
    type: ColumnTypes.timestamp,
    default: 'CURRENT_TIMESTAMP',
    isNullable: false,
  },
  {
    name: 'shipment_id',
    type: ColumnTypes.uuid,
    isNullable: true,
  },
];
