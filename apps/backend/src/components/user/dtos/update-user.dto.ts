import { CreateUserDto } from './create-user.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import { IsUUID, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}

@InputType()
export class ChangePasswordInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  currentPassword?: string;

  @IsString()
  @MinLength(8)
  @Field()
  newPassword: string;
}
