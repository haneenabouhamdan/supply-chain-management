import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsUUID,
  IsEnum,
  IsNumber,
  Min,
  IsOptional,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { OrderStatus, PaymentStatus } from '../enums';
import { Type } from 'class-transformer';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsUUID()
  customerId: string;

  @Field(() => OrderStatus)
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

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
  shipmentId?: UUID;

  @Field({ nullable: true })
  @IsOptional()
  reference?: string;

  @Field(() => [CreateItemInput])
  @ValidateNested({ each: true }) // Validate each item in the array
  @Type(() => CreateItemInput) // Transform and validate nested items
  items: CreateItemInput[];
}

@InputType()
export class CreateItemInput {
  @Field()
  @IsUUID()
  productId: string; // Ensure `string` is used as GraphQL doesn't natively support UUIDs

  @Field(() => Int)
  @IsInt()
  @Min(1)
  quantity: number; // Ensure quantity is an integer and at least 1
}
