import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  address: Date;
}
