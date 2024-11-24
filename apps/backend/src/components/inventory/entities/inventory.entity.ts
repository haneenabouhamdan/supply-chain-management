import { Entity, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/entities';

@ObjectType()
@Entity('inventory')
export class Inventory extends AbstractEntity {
  @Field(() => String)
  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Field(() => Int)
  @Column({ type: 'int', nullable: false, default: 0 })
  quantity: number;

  @Field(() => String)
  @Column({ type: 'uuid', nullable: false })
  supplierId: string;
}
