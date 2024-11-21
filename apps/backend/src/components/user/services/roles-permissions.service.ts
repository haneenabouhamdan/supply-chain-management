import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, Permission } from '../entities';
import { PermisionRepository, RoleRepository } from '../repositories';
import { In } from 'typeorm';
import { defaultPermissions, DefaultRoles } from '../enums';

@Injectable()
export class RolesPermissionsService {
  constructor(
    @InjectRepository(RoleRepository)
    private roleRepository: RoleRepository,

    @InjectRepository(PermisionRepository)
    private permissionRepository: PermisionRepository,
  ) {}

  // Methods to manage roles, permissions, and their assignments
  async createRole(name: string): Promise<Role> {
    const role = this.roleRepository.create({ name });
    return this.roleRepository.save(role);
  }

  async createPermission(name: string): Promise<Permission> {
    const permission = this.permissionRepository.create({ name });
    return this.permissionRepository.save(permission);
  }

  // async assignPermissionToRole(
  //   roleId: UUID,
  //   permissionId: UUID,
  // ): Promise<RolePermissions> {
  //   const role = await this.rolesRepository.findOne({
  //     where: { id: roleId },
  //   });
  //   const permission = await this.permissionsRepository.findOne({
  //     where: { id: permissionId },
  //   });
  //   if (role && permission) {
  //     const rolePermission = this.rolePermissionsRepository.create({
  //       role,
  //       permission,
  //     });
  //     return this.rolePermissionsRepository.save(rolePermission);
  //   }
  // }

  // Remove a role
  async removeRole(roleId: UUID): Promise<void> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    await this.roleRepository.softRemove(role);
  }

  // Remove a permission
  async removePermission(permissionId: UUID): Promise<void> {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    await this.permissionRepository.softRemove(permission);
  }

  async fetchDefaultMemberRole(name: string) {
    return await this.roleRepository.findOne({
      where: { name },
    });
  }

  async createDefaultRolesPermissions() {
    const existingPermissions = await this.permissionRepository.find({
      where: { name: In(defaultPermissions) },
    });

    const existingPermissionNames = existingPermissions.map((p) => p.name);

    const newPermissions = defaultPermissions
      .filter((name) => !existingPermissionNames.includes(name))
      .map((name) => ({ name }));

    if (!newPermissions.length) return;

    const savedPermissions =
      await this.permissionRepository.save(newPermissions);

    const allPermissions = [...existingPermissions, ...savedPermissions];

    const defaultRoles = [
      {
        name: DefaultRoles.ADMIN,
        permissions: allPermissions,
      },
    ];

    for (const roleData of defaultRoles) {
      const role = new Role();
      role.name = roleData.name;
      role.permissions = roleData.permissions;
      await this.roleRepository.save(role);
    }
  }
}
