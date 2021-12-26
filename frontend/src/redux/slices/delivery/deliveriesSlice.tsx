import { createSlice } from '@reduxjs/toolkit';

export const deliveriesSlice = createSlice({
  name: 'delivery',
  initialState: { deliveriesList: [] },
  reducers: {
    updateDeliveries: (state, action) => {
      state.deliveriesList = action.payload;
    },
  },
});


export const { updateDeliveries } = deliveriesSlice.actions;
export const deliveriesList = (state: any) => state.deliveries.deliveriesList;
export default deliveriesSlice.reducer;