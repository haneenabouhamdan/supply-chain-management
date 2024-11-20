import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export interface IPaginatedType<T> {
  data: T[];
  pageCount: Nullable<number>;
  total: Nullable<number>;
  currentPage: Nullable<number>;
  perPage: Nullable<number>;
  prevPage: Nullable<number>;
  nextPage: Nullable<number>;
}

export function PaginationDto<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedDto implements IPaginatedType<T> {
    @Field(() => [classRef])
    data: T[];

    @Field(() => Int, { nullable: true })
    total: number;

    @Field(() => Int, { nullable: true })
    pageCount: number;

    @Field(() => Int, { nullable: true })
    currentPage: number;

    @Field(() => Int, { nullable: true })
    perPage: number;

    @Field(() => Int, { nullable: true })
    prevPage: number;

    @Field(() => Int, { nullable: true })
    nextPage: number;
  }

  return PaginatedDto;
}

@ArgsType()
export class PaginationArgs {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Field(() => Int, { nullable: true })
  page?: Nullable<number>;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  @Field(() => Int, { nullable: true })
  perPage?: Nullable<number>;
}
