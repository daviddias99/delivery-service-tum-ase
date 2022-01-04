import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  deliverers: [],
  selectedDeliverers: []
};

export const deliverersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    updateDeliverers: (state, action) => {
      state.deliverers = action.payload;
    },
    updateSelctedDeliveres: (state, action) => {
      state.selectedDeliverers= action.payload;
    }

  },
});

export const { updateDeliverers, updateSelctedDeliveres } = deliverersSlice.actions;
export const deliverersList = (state: any) => state.deliverers.deliverers;
export const selectedDeliverersList = (state: any) => state.deliverers.selectedDeliverers;
export default deliverersSlice.reducer;