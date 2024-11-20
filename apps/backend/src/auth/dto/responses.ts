import { ObjectType, Field } from '@nestjs/graphql';
import { AuthResultType } from '../types';
import { AuthUserDto } from '../../common/dtos';

@ObjectType()
export class AuthResponseDto {
  @Field(() => AuthResultType)
  result: AuthResultType;

  @Field({ nullable: true })
  token?: string;

  @Field(() => AuthUserDto, { nullable: true })
  user?: AuthUserDto;
}

@ObjectType()
export class RegistrationResponseDto extends AuthResponseDto {}
