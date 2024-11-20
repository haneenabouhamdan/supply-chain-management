export enum DefaultRoles {
  SUPERADMIN = 'SuperAdmin',
  ADMIN = 'Admin',
  MENTOR = 'Mentor',
  MEMBER = 'Member',
}
export enum Permissions {
  CREATE_MESSAGE = 'create-messages',
  DELETE_MESSAGE = 'delete-message',
  VIEW_CHANNEL = 'view-channel',
  MANAGE_MEMBERS = 'manage-members',
  DELETE_CHANNEL = 'delete-channel',
}

export const defaultPermissions = [
  Permissions.CREATE_MESSAGE,
  Permissions.DELETE_MESSAGE,
  Permissions.VIEW_CHANNEL,
  Permissions.DELETE_CHANNEL,
  Permissions.MANAGE_MEMBERS,
];
