import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
  selectedCustomers: []
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    updateCustomer: (state, action) => {
      state.customers = action.payload;
    },
    updateSelectedCustomers: (state, action) => {
      state.selectedCustomers= action.payload;
    }

  },
});

export const { updateCustomer, updateSelectedCustomers } = customersSlice.actions;
export const customersList = (state: any) => state.customers.customers;
export const selectedCustomersList = (state: any) => state.customers.selectedCustomers;
export default customersSlice.reducer;