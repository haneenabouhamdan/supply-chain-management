import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

@InputType()
export class CreateSupplierInput {
  @Field()
  @IsString()
  @Length(3, 100)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^[\d+()-\s]+$/, { message: 'Invalid phone number format' })
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;
}
