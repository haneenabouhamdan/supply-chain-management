import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  IsUUID,
  MinLength,
  MaxLength,
} from 'class-validator';
import { UserStatus } from '../enums';
import { Field } from '@nestjs/graphql';

export class CreateUserInput {
  @Field({ nullable: false })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @Field({ nullable: false })
  @IsString()
  @Length(6, 100)
  password: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(9)
  @MaxLength(20)
  phoneNumber: string;

  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profilePicture?: string;

  @Field(() => UserStatus, { nullable: true })
  @IsOptional()
  @IsString()
  status?: UserStatus;

  @Field({ nullable: true })
  @IsOptional()
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  supplierId?: UUID;
}
