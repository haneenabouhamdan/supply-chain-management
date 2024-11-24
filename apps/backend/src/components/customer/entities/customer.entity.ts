import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/entities';

@ObjectType()
@Entity('customers')
export class Customer extends AbstractEntity {
  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  phone: string;

  @Field(() => Date)
  @Column({ nullable: false })
  address: Date;
}
