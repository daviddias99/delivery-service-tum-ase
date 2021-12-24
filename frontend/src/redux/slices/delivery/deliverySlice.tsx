import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deliveryInfo: {},
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

export default deliverySlice.reducer;