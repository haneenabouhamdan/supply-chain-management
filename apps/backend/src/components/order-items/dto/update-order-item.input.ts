import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateOrderItemInput } from './create-order-item.input';
import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class UpdateOrderItemInput extends PartialType(CreateOrderItemInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
