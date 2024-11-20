import { Injectable } from '@nestjs/common';
import { BaseCache } from 'src/common/cache';

@Injectable()
export class UserCache extends BaseCache {
  async cacheUserRoles(userId: UUID, roles: string[]): Promise<void> {
    this.setHashCache(`user:${userId}`, 'roles', JSON.stringify(roles));
  }

  async getUserRoles(userId: UUID): Promise<string[] | null> {
    const roles = await this.getCache(`user:${userId}`, 'roles');
    return roles ? (JSON.parse(roles) as string[]) : null;
  }

  async cacheUserPermissions(
    userId: UUID,
    permissions: string[],
  ): Promise<void> {
    this.setHashCache(
      `user:${userId}`,
      'permissions',
      JSON.stringify(permissions),
    );
  }

  async getUserPermissions(userId: UUID): Promise<string[] | null> {
    const permissions = await this.getCache(`user:${userId}`, 'permissions');

    return permissions ? (JSON.parse(permissions) as string[]) : null;
  }

  async invalidateUserRolesAndPermissionsCache() {
    return this.deleteUserCacheByKeyPattern('*user*', 0, 500);
  }

  async deleteUserCacheByKeyPattern(
    pattern: string,
    cursorAt: string | number = 0,
    count: string | number = 500,
  ) {
    const matched = await this.getMatchedKeysByPattern(
      pattern,
      cursorAt,
      count,
    );
    const cursor = matched[0];
    const keys = matched[1];

    keys.forEach((key: string) => {
      this.deleteHashKeys(`user${key.split('user')[1]}`);
    });

    if (cursor !== '0') {
      this.deleteUserCacheByKeyPattern(
        pattern,
        cursor,
        Number(count) - Number(cursor),
      );
    } else {
      return;
    }
  }
}
