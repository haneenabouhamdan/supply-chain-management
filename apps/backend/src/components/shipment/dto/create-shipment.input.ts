import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ShipmentStatus } from '../enums';

@InputType()
export class CreateShipmentInput {
  @Field(() => ShipmentStatus)
  @IsEnum(ShipmentStatus)
  status: ShipmentStatus;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  startTime?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  endTime?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  driverId?: string;
}
