import { Entity, Column } from 'typeorm';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { OrderStatus, PaymentStatus } from '../enums/order.enum';
import { GraphQLUUID } from 'graphql-scalars';
import { AbstractEntity } from 'src/common/entities';

@ObjectType()
@Entity('orders')
export class Order extends AbstractEntity {
  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  reference: string;

  @Field(() => GraphQLUUID)
  @Column({ type: 'uuid', nullable: false })
  customerId: UUID;

  @Field(() => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus, nullable: false })
  status: OrderStatus;

  @Field(() => PaymentStatus)
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    nullable: false,
  })
  paymentType: PaymentStatus;

  @Field(() => Float)
  @Column({ type: 'decimal', nullable: false })
  paymentAmount: number;

  @Field(() => GraphQLUUID)
  @Column({ type: 'uuid', nullable: false })
  supplierId: UUID;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  estimatedDeliveryDate?: Date;

  @Field(() => Date)
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  actualDeliveryDate: Date;

  @Field(() => GraphQLUUID, { nullable: true })
  @Column({ type: 'uuid', nullable: true })
  shipmentId?: UUID;
}
