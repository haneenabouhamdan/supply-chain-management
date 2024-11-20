import { ArgsType, Field, Int } from '@nestjs/graphql';
import {
  IsOptional,
  IsInt,
  IsString,
  IsUUID,
  IsBoolean,
} from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { FilterArgs } from 'src/common/dtos';

@ArgsType()
export class RoleFilterArgs extends FilterArgs {
  @IsOptional()
  @IsInt({ each: true })
  @Field(() => [Int], { nullable: true })
  id?: number[];

  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  name?: string[];

  @IsOptional()
  @IsUUID()
  @Field(() => GraphQLUUID, { nullable: true })
  userId?: UUID;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  withPermissions?: boolean;
}
