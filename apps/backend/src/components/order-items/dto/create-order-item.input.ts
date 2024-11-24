import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsInt, Min } from 'class-validator';

@InputType()
export class CreateOrderItemInput {
  @Field()
  @IsUUID()
  orderId: string;

  @Field()
  @IsUUID()
  productId: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  quantity: number;
}
