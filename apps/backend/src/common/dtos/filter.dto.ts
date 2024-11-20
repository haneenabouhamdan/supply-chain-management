import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
} from 'class-validator';
import { GraphQLDate, GraphQLDateTime } from 'graphql-scalars';
import { OrderSort } from '../types/enums';
import { EntityId } from '../types/type';
import { PaginationArgs } from './pagination.dto';

@InputType()
class FilterArgsBase extends PaginationArgs {
  @IsOptional()
  @Field(() => [ID])
  id: EntityId[];

  @IsOptional()
  @IsInt()
  @Max(50)
  @Field(() => Int)
  limit: number;

  @IsOptional()
  @IsString() // Can define an enum
  @Field(() => String)
  orderBy: string;

  @IsOptional()
  @IsEnum(OrderSort)
  @Field(() => OrderSort)
  order: OrderSort;

  @IsOptional()
  @IsDate()
  @Field(() => GraphQLDateTime)
  startDate: Date;

  @IsOptional()
  @IsDate()
  @Field(() => GraphQLDateTime)
  endDate: Date;

  @IsOptional()
  @IsDate()
  @Field(() => GraphQLDate, { nullable: true })
  date?: Date;

  @IsOptional()
  @IsString()
  @Field(() => String)
  keyword: string;
}

@InputType()
export class FilterArgs extends PartialType(FilterArgsBase) {}
