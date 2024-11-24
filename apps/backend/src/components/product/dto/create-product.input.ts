import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  price: number;

  @Field(() => Int, { defaultValue: 10 })
  @IsNumber()
  @Min(0)
  threshold: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;
}
