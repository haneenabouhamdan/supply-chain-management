import { registerEnumType } from '@nestjs/graphql';

export enum AuthResultType {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
}

registerEnumType(AuthResultType, {
  name: 'AuthResultType',
});

export interface AuthIdentifierType {
  identifier: string;
}

export interface JWTPayload {
  sub: UUID;
  iss: string;
  aud: string;
  phoneNumber: string;
  roles: string[];
  type?: string;
}
