import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { GraphQLString } from 'graphql';
import { GraphQLEmailAddress, GraphQLUUID } from 'graphql-scalars';
import { AccountStatus } from '../enums';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @Field(() => GraphQLEmailAddress)
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(9)
  @MaxLength(20)
  phoneNumber: string;

  @Field()
  @IsString()
  @MinLength(8)
  password: string;

  @Field(() => [GraphQLString], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];

  @Field(() => [GraphQLString], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];

  @Field(() => AccountStatus, { nullable: true })
  @IsOptional()
  @IsString()
  status?: AccountStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @Field(() => GraphQLUUID, { nullable: true })
  @IsOptional()
  @IsUUID()
  supplierId?: UUID;
}
