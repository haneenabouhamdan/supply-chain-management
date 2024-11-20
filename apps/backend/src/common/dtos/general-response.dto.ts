import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GeneralResponseDto {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
