import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAbstractEntity } from '../types';

export type Constructor<T, EntityDTOConstructorOptions> = new (
  entity: T,
  options?: EntityDTOConstructorOptions,
) => T;

export abstract class AbstractEntity implements IAbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Nullable<Date>;
}
