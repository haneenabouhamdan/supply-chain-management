import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PERMISSIONS_KEY, SUPER_ROLES } from '../../common/constants';
import { ROLES_KEY } from '../../common/decorators';
import { AuthUserDto } from '../../common/dtos';
import { DefaultRoles, Permissions } from '../../components/user/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const type = context.getType<'http' | 'rmq'>();
    if (type === 'rmq') {
      return true;
    }
    const requiredRoles = this.reflector.getAllAndOverride<
      DefaultRoles[] | undefined
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    const requiredPermissions = this.reflector.getAllAndOverride<
      Permissions[] | undefined
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles && !requiredPermissions) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);

    const user = ctx.getContext().req.user as AuthUserDto | undefined;

    if (!user) {
      return false;
    }

    // Check for super role
    if (SUPER_ROLES.some((superRole) => user.roles?.includes(superRole))) {
      return true;
    }

    // Check regular roles and permissions
    const rolesPassed =
      !requiredRoles ||
      requiredRoles.some((role) => user.roles?.includes(role));

    const permissionsPassed =
      !requiredPermissions ||
      requiredPermissions.some((permission) => {
        return (
          user.permissions?.includes(permission) ||
          user.permissions?.includes(`manage-${permission.split('-')[1]}`)
        );
      });

    return rolesPassed && permissionsPassed;
  }
}
