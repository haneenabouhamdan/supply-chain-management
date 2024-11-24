import { GraphQLUUID } from 'graphql-scalars';
import { CreateOrderInput } from './create-order.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
