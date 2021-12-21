import { createSlice } from '@reduxjs/toolkit';
import { Delivery } from 'types';

// TODO: delete
const delivery: Delivery = {
  'id': '786b6c5d-bc5a-57db-9241-3cfe1fe86770',
  'trackingNumber': 'aa0973a7-312a-54db-b1d5-130ed474921c',
  'dispatcher': {
    'name': 'Chad Silva',
    'id': '270e8b89-41a6-5751-b08c-b85ab1683b78'
  },
  'box': {
    'name': 'Mattie Wade',
    'id': 'd7eb3202-1ac8-56bb-ad5a-a85e361668ba',
  },
  'deliverer': {
    'name': 'Hattie Hawkins',
    'id': '025bda9f-2607-5c4d-9d99-c4ecbc889d44'
  },
  'customer': {
    'name': 'Lou Wood',
    'id': '7503e790-0f86-5e47-844c-433df6ab2fc3'
  },
  'statusHistory': [
    {
      'deliveryStatus': 'dispatched',
      'statusUpdate': '2021-11-17T22:39:10+02:00'
    },
    {
      'deliveryStatus': 'ordered',
      'statusUpdate': '2021-11-16T22:39:10+02:00'
    }
  ],
  'description': 'Your package from the ASE department store.'
};

const initialState = {
  deliveryInfo: delivery,
};

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    updateDelivery: (state, action) => {
      state.deliveryInfo = action.payload;
    },

  },
});

export const { updateDelivery } = deliverySlice.actions;
export const deliveryInfo = (state: any) => state.delivery.deliveryInfo;
export { delivery };

export default deliverySlice.reducer;