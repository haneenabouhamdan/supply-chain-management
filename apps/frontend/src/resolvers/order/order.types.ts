export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  threshold: number;
  category: string;
  inventoryId: string;
  quantity: number;
}

export interface OrderItem {
  orderId: string;
  product?: Product;
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  reference: string;
  customerId: string;
  status: string;
  paymentType: string;
  paymentAmount: number;
  supplierId: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate: string;
  shipmentId: string;
  items: OrderItem[];
  customer?: {
    name: string;
    phone: string;
  };
  supplier?: {
    name: string;
  };
}
export interface UpdateOrderInput {
  status?: string;
  paymentType?: string;
  paymentAmount?: number;
  supplierId?: string;
  estimatedDeliveryDate?: string;
  items?: OrderItem[];
  actualDeliveryDate?: string;
  reference?: string;
}

export interface UpdateOrderResponse {
  updateOrder: {
    reference: string;
    customerId: string;
    status: string;
    paymentType: string;
    paymentAmount: number;
    supplierId: string;
    estimatedDeliveryDate: string;
    actualDeliveryDate: string;
    shipmentId: string;
    items: {
      orderId: string;
      product: {
        sku: string;
        name: string;
        description: string;
        price: number;
        threshold: number;
        category: string;
      };
      productId: string;
      quantity: number;
    }[];
  };
}

export interface CreateOrderInput {
  customerId: string;
  estimatedDeliveryDate?: string; // ISO date string
  items: CreateItemInput[];
  paymentAmount: number;
  paymentType: PaymentStatus;
  reference?: string;
  shipmentId?: string;
  status?: OrderStatus;
  supplierId: string;
}

export interface CreateItemInput {
  productId: string;
  quantity: number;
}

export type PaymentStatus = "Card" | "Cash" | "Online"; // Replace with actual statuses if enums are available
export type OrderStatus = "Pending" | "Confirmed" | "Shipped" | "Delivered"; // Replace with actual statuses

export interface CreateOrderResponse {
  reference: string;
  customerId: string;
  status: string;
  paymentType: string;
  paymentAmount: number;
  supplierId: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate: string;
  items: OrderItem[];
}
