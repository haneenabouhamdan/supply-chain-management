import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { GraphQLUUID } from 'graphql-scalars';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
