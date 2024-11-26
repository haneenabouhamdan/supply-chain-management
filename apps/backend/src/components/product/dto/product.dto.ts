import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductDto {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  @Field(() => String)
  sku: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  threshold: number;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  inventoryId: string;
}
