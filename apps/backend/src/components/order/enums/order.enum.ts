import { registerEnumType } from '@nestjs/graphql';

export enum OrderStatus {
  REQUESTED = 'REQUESTED',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED', // The order has been handed over to the carrier/logistics provider for transportation.
  IN_TRANSIT = 'IN_TRANSIT', // The order is on its way to the delivery destination.
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

export enum PaymentStatus {
  PREPAID = 'PREPAID',
  COD = 'COD',
}

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
});
