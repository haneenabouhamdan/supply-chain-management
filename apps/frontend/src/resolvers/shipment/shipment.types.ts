export interface Shipment {
  status: string;
  trackingNumber: string;
  startTime: string;
  endTime: string;
  driverId: string;
  driver: {
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
    status: string;
    dateOfBirth: string;
    profilePicture: string;
    supplierId: string;
  };
}

export interface CreateShipmentInput {
  status: string;
  trackingNumber: string;
  startTime: string;
  endTime: string;
  driverId: string;
}

export interface CreateShipmentResponse {
  createShipment: {
    status: string;
    trackingNumber: string;
    startTime: string;
    endTime: string;
    driverId: string;
    driver: {
      id: string;
      username: string;
      email: string;
      phoneNumber: string;
      status: string;
      dateOfBirth: string;
      profilePicture: string;
    };
  };
}

export interface UpdateShipmentInput {
  status?: string;
  trackingNumber?: string;
  startTime?: string;
  endTime?: string;
  driverId?: string;
}
