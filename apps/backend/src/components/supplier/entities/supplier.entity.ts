import { ObjectType, Field } from '@nestjs/graphql';
import { AbstractEntity } from 'src/common/entities';
import { Entity, Column } from 'typeorm';

@ObjectType()
@Entity('suppliers') // Define the table name
export class Supplier extends AbstractEntity {
  @Field(() => String)
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  address?: string;
}
