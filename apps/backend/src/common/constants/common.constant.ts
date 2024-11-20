export const DATE_COMPARISON_FUNCTIONS = {
  '>': <T>(first: T, second: T) => first > second,
  '>=': <T>(first: T, second: T) => first >= second,
  '<': <T>(first: T, second: T) => first < second,
  '<=': <T>(first: T, second: T) => first <= second,
  '==': <T>(first: T, second: T) => first === second,
};

export enum ErrorCodes {
  FORBIDDEN = 'FORBIDDEN',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  NOT_FOUND = 'ENTITY_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  BAD_REQUEST = 'BAD_REQUEST',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const ROLES_KEY = 'roles';
export const PERMISSIONS_KEY = 'permissions';
export const SKIP_AUTH_KEY = 'skipauth';

export enum DefaultRoles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  DISPATCHER = 'DISPATCHER',
  DRIVER = 'DRIVER',
  ACCOUNT_MANAGER = 'ACCOUNT_MANAGER',
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER',
  EMPLOYEE = 'EMPLOYEE',
}

export const SUPER_ROLES = [DefaultRoles.SUPER_ADMIN, DefaultRoles.ADMIN];

export const NEST_LOADER_CONTEXT_KEY = 'NEST_LOADER_CONTEXT_KEY';

export enum RequestMethods {
  post = 'POST',
  get = 'GET',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE',
}
