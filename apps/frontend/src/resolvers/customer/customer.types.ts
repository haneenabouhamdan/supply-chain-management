// customers.types.ts

/**
 * Represents a Customer entity
 */
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null; // Optional for soft-deleted customers
}

/**
 * Input type for creating a customer
 */
export interface CreateCustomerInput {
  name: string;
  email: string;
  phone: string;
  address: string;
}

/**
 * Input type for updating a customer
 */
export interface UpdateCustomerInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

/**
 * Response type for creating a customer
 */
export interface CreateCustomerResponse {
  id: string;
}

/**
 * Response type for updating a customer
 */
export interface UpdateCustomerResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
/**
 * Query result for fetching all customers
 */
export interface GetCustomersResponse {
  customers: Customer[];
}

/**
 * Query result for fetching a single customer
 */
export interface GetCustomerResponse {
  customer: Customer;
}
