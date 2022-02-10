type BoxStatus = 'free' | 'assigned' | 'active' | 'inactive';
type DeliveryStatus = 'ordered' | 'dispatched' | 'delivered' | 'collected';
type UserRole = 'DISPATCHER' | 'DELIVERER' | 'CUSTOMER';

type BoxAddress = {
  addressLine1: string,
  addressLine2?: string,
  city: string,
  postalCode: string
}

type User = {
  id: string,
  firstName: string,
  surname: string,
  role: UserRole,
  email: string,
};

type Box = {
  id: string,
  raspberryId: string,
  name: string,
  address: BoxAddress
  status: BoxStatus
}

type Delivery = {
  id: string,
  trackingNumber: string,
  deliverer: {
    name: string,
    id: string,
  },
  customer: {
    name: string,
    id: string,
  },
  dispatcher: {
    name: string,
    id: string,
  },
  box: {
    name: string,
    id: string,
  },
  statusHistory: {
    deliveryStatus: DeliveryStatus,
    statusUpdate: string,
  }[]
  description: string;
}


export type {
  Box,
  BoxStatus,
  BoxAddress,
  Delivery,
  DeliveryStatus,
  User
};

