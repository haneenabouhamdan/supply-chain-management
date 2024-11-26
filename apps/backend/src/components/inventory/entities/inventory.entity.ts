import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/entities';
import { Product } from 'src/components/product/entities';

@ObjectType()
@Entity('inventory')
export class Inventory extends AbstractEntity {
  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Field(() => String)
  @Column({ type: 'uuid', nullable: false })
  supplierId: string;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.inventory, { cascade: true })
  products: Product[];
}
