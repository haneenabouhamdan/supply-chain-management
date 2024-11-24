import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateCustomerInput } from './create-customer.input';
import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
