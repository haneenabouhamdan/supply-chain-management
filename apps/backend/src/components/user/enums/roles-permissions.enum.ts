export enum DefaultRoles {
  SUPERADMIN = 'SuperAdmin',
  ADMIN = 'Admin',
  DISPATCHER = 'Dispatcher',
  DRIVER = 'Driver',
  ACCOUNT_MANAGER = 'AccountManager',
  CUSTOMER = 'Customer',
  SUPPLIER = 'Supplier',
  EMPLOYEE = 'Employee',
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
