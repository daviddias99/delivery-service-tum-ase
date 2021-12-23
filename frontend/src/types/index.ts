type BoxStatus = 'free' | 'assigned' | 'active' | 'inactive';
type DeliveryStatus = 'ordered' | 'dispatched' | 'delivered' | 'collected';

type BoxAddress = {
  addressLine1: string,
  addressLine2?: string,
  city: string,
  postalCode: string
}

type Customer = {
  id: string,
  username: string,
  firstName: string,
  surname: string,
  role: string,
  email: string,
};

type Deliverer = {
  id: string,
  username: string,
  firstName: string,
  surname: string,
  role: string,
  email: string,
};

type Box = {
  id: string,
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
  Customer,
  Deliverer
};

