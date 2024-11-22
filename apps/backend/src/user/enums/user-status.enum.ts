import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

registerEnumType(UserStatus, {
  name: 'UserStatus',
});
