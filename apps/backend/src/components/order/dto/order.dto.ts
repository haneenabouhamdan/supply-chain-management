import { Field, ObjectType, Float } from '@nestjs/graphql';
import { OrderStatus, PaymentStatus } from '../enums/order.enum';
import { GraphQLUUID } from 'graphql-scalars';

@ObjectType()
export class OrderDto {
  @Field(() => GraphQLUUID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Field(() => String)
  reference: string;

  @Field(() => GraphQLUUID)
  customerId: string;

  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => PaymentStatus)
  paymentType: PaymentStatus;

  @Field(() => Float)
  paymentAmount: number;

  @Field(() => GraphQLUUID)
  supplierId: string;

  @Field(() => Date, { nullable: true })
  estimatedDeliveryDate?: Date;

  @Field(() => Date, { nullable: true })
  actualDeliveryDate?: Date;

  @Field(() => GraphQLUUID, { nullable: true })
  shipmentId?: string;
}
