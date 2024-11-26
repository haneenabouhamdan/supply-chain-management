import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CustomerDto {
  // AbstractEntity fields
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;

  // Customer-specific fields
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  address: string;
}
