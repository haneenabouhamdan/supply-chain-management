export enum TableNames {
  users = 'users',
  roles = 'roles',
  permissions = 'permissions',
  rolePermissions = 'role_permissions',
  suppliers = 'suppliers',
  customers = 'customers',
  inventory = 'inventory',
  orders = 'orders',
  orderItems = 'order_items',
  products = 'products',
  shipments = 'shipments',
  tokens = 'tokens',
}

export enum ColumnTypes {
  boolean = 'boolean',
  varchar = 'varchar',
  text = 'text',
  uuid = 'uuid',
  json = 'json',
  timestamp = 'timestamp',
  date = 'date',
  time = 'time',
  float = 'float8',
  int = 'int8',
  enum = 'enum',
  smallint = 'int2',
  decimal = 'decimal',
}

export interface IColumn {
  name: string;
  type: string;
  length?: string;
  isUnique?: boolean;
  isPrimary?: boolean;
  enum?: string[];
  default?: any;
  isNullable: boolean;
  isArray?: boolean;
  isForeignKey?: boolean;
  referencedTable?: string;
  referencedColumn?: string;
}

export const DATABASE_ENUMS_NAMES = Object.freeze({
  roles: 'roles_enum',
  userStatus: 'user_status_enum',
});

export const DATABASE_ENUMS = Object.freeze({
  roles: [
    'SUPER_ADMIN',
    'ADMIN',
    'DISPATCHER',
    'DRIVER',
    'ACCOUNT_MANAGER',
    'CUSTOMER',
    'SUPPLIER',
    'EMPLOYEE',
  ],
  userStatuses: ['PENDING', 'ACTIVE', 'INACTIVE'],
  orderStatuses: [
    'REQUESTED',
    'PACKED',
    'SHIPPED', //	The order has been handed over to the carrier/logistics provider for transportation.
    'IN_TRANSIT', //	The order is on its way to the delivery destination.
    'DELIVERED',
    'RETURNED',
    'CANCELLED',
  ],
  shipmentStatuses: [
    'CREATED', //	A shipment record has been created but not yet ready for dispatch.
    'READY_FOR_PICKUP', //	The shipment is ready for the carrier to pick up from the warehouse.
    'DISPATCHED', //	The shipment has been picked up by the carrier.
    'IN_TRANSIT', //	The shipment is in transit to the delivery destination.
    'OUT_FOR_DELIVERY', //	The shipment has reached the local delivery hub and is out for final delivery to the customer.
    'DELIVERED', //	The shipment has been successfully delivered to the recipient.
    'FAILED', //	The shipment delivery attempt failed (e.g., recipient not available).
    'RETURNED',
  ],
  paymentStatuses: ['PREPAID', 'COD'],
});
