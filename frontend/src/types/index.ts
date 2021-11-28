
enum BoxStatus {
  FREE = 'free',
  ASSIGNED = 'assigned',
  FULL = 'full',
}

type Box = {
  id: string,
  name: string,
  address: {
    addressLine1: string,
    addressLine2?: string,
    city: string,
    postalCode: string
  }
  status: string
}

export type {
  Box
};

export {
  BoxStatus
};

