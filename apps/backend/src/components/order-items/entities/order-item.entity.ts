import { Entity, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/entities';

@ObjectType()
@Entity('order_items')
export class OrderItem extends AbstractEntity {
  @Field(() => String)
  @Column({ type: 'uuid', nullable: false })
  orderId: string;

  @Field(() => String)
  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false, default: 1 })
  quantity: number;
}
