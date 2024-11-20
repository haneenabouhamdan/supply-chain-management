import { registerEnumType } from '@nestjs/graphql';

export enum AccountStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

registerEnumType(AccountStatus, {
  name: 'AccountStatus',
});
