import { registerEnumType } from '@nestjs/graphql';

export enum Timezones {
  utc = 'UTC',
  dubai = 'Asia/Dubai',
  lebanon = 'Asia/Beirut',
}

export enum Days {
  sunday = 'Sunday',
  monday = 'Monday',
  tuesday = 'Tuesday',
  wednesday = 'Wednesday',
  thursday = 'Thursday',
  friday = 'Friday',
  saturday = 'Saturday',
}

export enum CompareOperators {
  gt = '>',
  lt = '<',
  equal = '==',
  gte = '>=',
  lte = '<=',
}

export enum OrderSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderSort, { name: 'OrderSort' });

export enum TypeOrmExceptionCodes {
  duplicates = '23505',
  empty = '23502',
}
