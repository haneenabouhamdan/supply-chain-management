import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLDateTime, GraphQLUUID } from 'graphql-scalars';
import { EntityDTOConstructorOptions, IEntityDTO } from '../types';

@ObjectType()
export class EntityDTO {
  @Field(() => GraphQLUUID)
  id: UUID;

  @Field(() => GraphQLDateTime)
  createdAt: Date;

  @Field(() => GraphQLDateTime)
  updatedAt: Date;

  @Field(() => GraphQLDateTime, { nullable: true })
  deletedAt: Nullable<Date>;

  constructor(
    entity: IEntityDTO,
    options?: EntityDTOConstructorOptions<IEntityDTO>,
  ) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.deletedAt = entity.deletedAt;
    options?.excludeFields?.forEach((excludedField) => {
      delete this[excludedField];
    });
  }
}
