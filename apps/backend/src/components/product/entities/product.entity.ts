import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/entities';
import { Inventory } from 'src/components/inventory/entities';

@ObjectType()
@Entity('products')
export class Product extends AbstractEntity {
  @Field(() => String)
  @Column({ type: 'varchar', unique: true, nullable: false })
  sku: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => Float)
  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false, default: 10 })
  threshold: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  category?: string;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false, default: 10 })
  quantity: number;

  @Field(() => String)
  @Column({ type: 'uuid', nullable: false })
  inventoryId: UUID;

  @Field(() => Inventory)
  @ManyToOne(() => Inventory, (inventory) => inventory.products)
  inventory: Inventory;
}
