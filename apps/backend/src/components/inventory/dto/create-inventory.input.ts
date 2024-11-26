import { InputType, Field, Int } from '@nestjs/graphql';
import { IsUUID, IsString, IsInt, Min, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateInventoryInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  location: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  quantity: number;

  @Field()
  @IsUUID()
  supplierId: string;
}
