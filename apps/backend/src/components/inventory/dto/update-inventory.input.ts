import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateInventoryInput } from './create-inventory.input';
import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class UpdateInventoryInput extends PartialType(CreateInventoryInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
