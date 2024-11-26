import {
  InputType,
  Field,
  registerEnumType,
  Float,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import {
  IsOptional,
  IsBoolean,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';
import { Inventory } from '../entities';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
registerEnumType(SortOrder, {
  name: 'SortOrder', // This name will be used in the GraphQL schema
  description: 'Sorting order: ASC for ascending and DESC for descending',
});

@InputType() // Change this to InputType
export class InventoryFilterArgs {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  location?: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  lowStock?: boolean;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  category?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  supplier?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  keyword?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.ASC })
  sortOrder?: SortOrder;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  sortBy?: keyof Inventory;
}

@ObjectType()
export class InventoryInsightsDto {
  @Field(() => Int)
  totalInventories: number;

  @Field(() => Int)
  totalProducts: number;

  @Field(() => Int)
  lowStockProducts: number;

  @Field(() => Float)
  averageStockPerInventory: number;

  @Field(() => Int)
  distinctSuppliers: number;
}
