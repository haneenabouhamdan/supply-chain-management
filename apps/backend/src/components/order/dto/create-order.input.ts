import { InputType, Field, Float } from '@nestjs/graphql';
import { IsUUID, IsEnum, IsNumber, Min, IsOptional } from 'class-validator';
import { OrderStatus, PaymentStatus } from '../enums';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsUUID()
  customerId: string;

  @Field(() => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @Field(() => PaymentStatus)
  @IsEnum(PaymentStatus)
  paymentType: PaymentStatus;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  paymentAmount: number;

  @Field()
  @IsUUID()
  supplierId: string;

  @Field({ nullable: true })
  @IsOptional()
  estimatedDeliveryDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  shipmentId?: string;
}
