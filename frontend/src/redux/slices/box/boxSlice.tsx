import { createSlice } from '@reduxjs/toolkit';
import { Box } from 'types';
import deliveries from './deliveriesStub';

// TODO: delete
const box: Box = {
  id: 'bfZPwGdetxUlGgpb',
  name: 'Allen Blair',
  address: {
    addressLine1: '1752 Onhop Pike',
    addressLine2: '7',
    city: 'Jopnifes',
    postalCode: '5352-457'
  },
  status: 'active'
};

const initialState = {
  boxInfo: box,
  deliveries: deliveries,
};

export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    updateBox: (state, action) => {
      state.boxInfo = action.payload;
    },

  },
});

export const { updateBox } = boxSlice.actions;
export const boxInfo = (state: any) => state.box.boxInfo;
export const boxDeliveries = (state: any) => state.box.deliveries;
export { box };

export default boxSlice.reducer;