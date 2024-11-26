import { Entity, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/entities';
import { Product } from 'src/components/product/entities';

@ObjectType()
@Entity('order_items')
export class OrderItem extends AbstractEntity {
  @Field(() => String)
  @Column({ type: 'uuid', nullable: false })
  orderId: UUID;

  @Field(() => String)
  @Column({ type: 'uuid', nullable: false })
  productId: UUID;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false, default: 1 })
  quantity: number;

  @Field(() => Product, { nullable: true }) // Add the product field
  product?: Product;
}
