import { IsUUID } from 'class-validator';
import { GraphQLUUID } from 'graphql-scalars';
import { CreateShipmentInput } from './create-shipment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateShipmentInput extends PartialType(CreateShipmentInput) {
  @IsUUID(4)
  @Field(() => GraphQLUUID)
  id: UUID;
}
