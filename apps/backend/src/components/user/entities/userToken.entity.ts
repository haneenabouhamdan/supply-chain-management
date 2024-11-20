import { AbstractEntity } from '../../../common/entities';
import { Column, Entity } from 'typeorm';

@Entity('user_tokens')
export class UserToken extends AbstractEntity {
  @Column() refreshToken: string;

  @Column({ type: 'uuid', nullable: false }) userId: UUID;

  @Column({ nullable: true }) expiresAt: Date;
}
