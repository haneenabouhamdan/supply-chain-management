import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class SignInInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password: string;
}
