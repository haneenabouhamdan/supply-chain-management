import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import { ShipmentStatus } from '../enums';
import { AbstractEntity } from 'src/common/entities';

@ObjectType()
@Entity('shipments')
export class Shipment extends AbstractEntity {
  @Field(() => String)
  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: 'CREATED',
    nullable: false,
  })
  status: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', unique: true, nullable: true })
  trackingNumber?: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  startTime?: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  endTime?: Date;

  @Field(() => GraphQLUUID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  driverId?: string;
}
