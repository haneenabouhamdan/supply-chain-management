import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserToken } from './entities';
import { UserRepository } from './repositories/user.repository';
import { UserResolver } from './user.resolver';
import {
  PermisionRepository,
  RoleRepository,
  UserTokenRepository,
} from './repositories';
// import { UserCache } from './cache';
import { RoleFilter, UserFilter } from './filters';
import { RolesPermissionsService, TokenService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserToken])],
  providers: [
    UserService,
    TokenService,
    UserResolver,
    UserRepository,
    RoleRepository,
    // UserCache,
    UserFilter,
    RoleFilter,
    RolesPermissionsService,
    PermisionRepository,
    UserTokenRepository,
  ],
  exports: [
    UserService,
    UserFilter,
    RolesPermissionsService,
    TokenService,
    UserTokenRepository,
    UserRepository,
  ],
})
export class UserModule {}
