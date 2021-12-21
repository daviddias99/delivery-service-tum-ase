import { createSlice } from '@reduxjs/toolkit';
// import { Delivery } from 'types/index';
// import deliveries from '../box/deliveriesStub';

// const initialState = {
//   deliveriesList: deliveries as Delivery[],
// };


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