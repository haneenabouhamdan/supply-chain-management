import { GraphQLUUID } from 'graphql-scalars';
import { CreateSupplierInput } from './create-supplier.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {
  @Field(() => GraphQLUUID)
  id: UUID;
}
