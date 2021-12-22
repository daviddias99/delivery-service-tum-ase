import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boxInfo: {},
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

export default boxSlice.reducer;