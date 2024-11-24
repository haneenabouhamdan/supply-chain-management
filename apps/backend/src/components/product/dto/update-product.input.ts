import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';
import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
