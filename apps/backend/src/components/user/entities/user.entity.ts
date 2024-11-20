import { AbstractEntity } from '../../../common/entities';
import { Column, Entity } from 'typeorm';
import { AccountStatus } from '../enums';

@Entity('users')
export class User extends AbstractEntity {
  @Column() username: string;

  @Column({ unique: true }) phoneNumber: string;

  @Column({ unique: true, nullable: true }) email: string;

  @Column() password: string;

  @Column({ nullable: true }) bio: string;

  @Column({ nullable: true }) jobTitle: string;

  @Column({ nullable: true }) profilePicture: string;

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.ACTIVE })
  status: AccountStatus;

  @Column({ nullable: true }) dateOfBirth: Date;
}
