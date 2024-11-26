// shipmentStatuses.enum.ts
export enum ShipmentStatus {
  CREATED = "CREATED", // A shipment record has been created but not yet ready for dispatch.
  READY_FOR_PICKUP = "READY_FOR_PICKUP", // The shipment is ready for the carrier to pick up from the warehouse.
  DISPATCHED = "DISPATCHED", // The shipment has been picked up by the carrier.
  IN_TRANSIT = "IN_TRANSIT", // The shipment is in transit to the delivery destination.
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY", // The shipment has reached the local delivery hub and is out for final delivery to the customer.
  DELIVERED = "DELIVERED", // The shipment has been successfully delivered to the recipient.
  FAILED = "FAILED", // The shipment delivery attempt failed (e.g., recipient not available).
  RETURNED = "RETURNED", // The shipment has been returned to the sender.
}
