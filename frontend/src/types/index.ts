type BoxStatus = 'free' | 'assigned' | 'active' | 'inactive';
type DeliveryStatus = 'ordered' | 'dispatched' | 'delivered' | 'collected';

type Box = {
  id: string,
  name: string,
  address: {
    addressLine1: string,
    addressLine2?: string,
    city: string,
    postalCode: string
  }
  status: BoxStatus
}

type Delivery = {
  id: string,
  deliverer: {
    name: string,
    id: string,
  },
  customer: {
    name: string,
    id: string,
  },
  status: DeliveryStatus,
  statusUpdate: string
}

export type {
  Box,
  BoxStatus,
  Delivery,
  DeliveryStatus,
};

