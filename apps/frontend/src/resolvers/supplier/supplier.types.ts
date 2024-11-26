// supplier.types.ts

/**
 * Input type for creating a supplier
 */
export interface CreateSupplierInput {
  name: string;
  email: string;
  phone: string;
  address: string;
}

/**
 * Input type for updating a supplier
 */
export interface UpdateSupplierInput {
  id: string; // Assuming `id` is required to identify the supplier being updated
  name?: string; // Optional in case only specific fields need to be updated
  email?: string;
  phone?: string;
  address?: string;
}

/**
 * Response type for a single supplier
 */
export interface SupplierResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}
