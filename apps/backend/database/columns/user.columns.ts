import { ColumnTypes, DATABASE_ENUMS, IColumn } from '../type';

export const userColumns: IColumn[] = [
  {
    name: 'username',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'password',
    type: ColumnTypes.varchar,
    isNullable: false,
  },
  {
    name: 'phone_number',
    type: ColumnTypes.varchar,
    isUnique: true,
    isNullable: false,
  },
  {
    name: 'email',
    type: ColumnTypes.varchar,
    isUnique: true,
    isNullable: false,
  },
  {
    name: 'profile_picture',
    type: ColumnTypes.text,
    isNullable: true,
  },
  {
    name: 'status',
    type: ColumnTypes.enum,
    enum: DATABASE_ENUMS.userStatuses,
    default: "'PENDING'",
    isNullable: false,
  },
  {
    name: 'date_of_birth',
    type: ColumnTypes.date,
    isNullable: true,
  },
  {
    name: 'supplier_id',
    type: ColumnTypes.uuid,
    isNullable: true,
  },
];
