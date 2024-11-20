import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { AccountStatus } from 'src/components/user/enums';

@ObjectType()
export class AuthUserDto {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field(() => GraphQLEmailAddress)
  email: string;

  @Field()
  phoneNumber: string;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field(() => Date, { nullable: true })
  dateOfBirth: Date;

  @Field(() => String, { nullable: true })
  profilePicture: string;

  @Field(() => [GraphQLString], { nullable: true })
  roles?: string[];

  @Field(() => [GraphQLString], { nullable: true })
  permissions?: string[];
}
