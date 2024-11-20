import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { IMutationResponse } from '../types';

type Options = {
  name: string;
};

export function mutationResponse<T>(
  classRef: Type<T>,
  { name }: Options,
): Type<IMutationResponse<T>> {
  @ObjectType(name, { isAbstract: true })
  abstract class MutationResponse {
    @Field()
    message: string;

    @Field(() => classRef)
    data: T;
  }

  return MutationResponse as Type<IMutationResponse<T>>;
}

export function listMutationResponse<T>(
  classRef: Type<T>,
  { name }: Options,
): Type<IMutationResponse<T[]>> {
  @ObjectType(name, { isAbstract: true })
  abstract class MutationResponse {
    @Field()
    message: string;

    @Field(() => [classRef])
    data: T[];
  }

  return MutationResponse as Type<IMutationResponse<T[]>>;
}
