import { AbstractEntity } from '../../../common/entities';
import { Column, Entity } from 'typeorm';
import { UserStatus } from '../enums';

@Entity('users')
export class User extends AbstractEntity {
  @Column() username: string;

  @Column({ unique: true }) phoneNumber: string;

  @Column({ unique: true, nullable: true }) email: string;

  @Column() password: string;

  @Column({ nullable: true }) profilePicture: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ nullable: true }) dateOfBirth: Date;
}
