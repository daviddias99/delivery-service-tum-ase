import { createSlice } from '@reduxjs/toolkit';
import { Box } from 'types';

const box: Box = {
  id: 'Loading',
  name: 'Loading',
  address: {
    addressLine1: 'Loading',
    addressLine2: 'Loading',
    city: 'Loading',
    postalCode: 'Loading'
  },
  status: 'active'
};

const initialState = {
  boxInfo: box,
  deliveries: [],
};

export const boxSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    updateBox: (state, action) => {
      state.boxInfo = action.payload;
    },
    updateBoxDeliveries: (state, action) => {
      state.deliveries = action.payload;
    },
  },
});

export const { updateBox, updateBoxDeliveries } = boxSlice.actions;
export const boxInfo = (state: any) => state.box.boxInfo;
export const boxDeliveries = (state: any) => state.box.deliveries;
// export { box };

export default boxSlice.reducer;