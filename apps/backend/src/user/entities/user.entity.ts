import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/common/entities';
import { DATABASE_ENUMS } from 'database/type';

@Entity('users')
export class User extends AbstractEntity {
  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: true })
  profilePicture?: string;

  @Column({
    type: 'enum',
    enum: DATABASE_ENUMS.userStatuses,
    default: 'PENDING',
    nullable: false,
  })
  status: string;

  @Column({ type: 'date', name: 'date_of_birth', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'uuid', nullable: true })
  supplierId?: UUID;
}
