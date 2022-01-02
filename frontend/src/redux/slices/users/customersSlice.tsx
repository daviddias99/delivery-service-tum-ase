import { createSlice } from '@reduxjs/toolkit';
const customerList = [
  {
    'id': 1,
    'userName': 'dmithon0',
    'firstName': 'Dallas',
    'surname': 'Mithon',
    'email': 'dmithon0@jugem.jp'
  }, {
    'id': 2,
    'userName': 'bdislee1',
    'firstName': 'Beauregard',
    'surname': 'Dislee',
    'email': 'bdislee1@histats.com'
  }, {
    'id': 3,
    'userName': 'cungaretti2',
    'firstName': 'Cathrin',
    'surname': 'Ungaretti',
    'email': 'cungaretti2@mlb.com'
  }, {
    'id': 4,
    'userName': 'eivel3',
    'firstName': 'Emlynn',
    'surname': 'Ivel',
    'email': 'eivel3@msu.edu'
  }, {
    'id': 5,
    'userName': 'gsavage4',
    'firstName': 'Giorgi',
    'surname': 'Savage',
    'email': 'gsavage4@salon.com'
  }, {
    'id': 6,
    'userName': 'rnowlan5',
    'firstName': 'Roanna',
    'surname': 'Nowlan',
    'email': 'rnowlan5@sogou.com'
  }, {
    'id': 7,
    'userName': 'zgisbourn6',
    'firstName': 'Zarla',
    'surname': 'Gisbourn',
    'email': 'zgisbourn6@howstuffworks.com'
  }, {
    'id': 8,
    'userName': 'cmacvanamy7',
    'firstName': 'Calli',
    'surname': 'MacVanamy',
    'email': 'cmacvanamy7@stanford.edu'
  }, {
    'id': 9,
    'userName': 'atiner8',
    'firstName': 'Angie',
    'surname': 'Tiner',
    'email': 'atiner8@ustream.tv'
  }, {
    'id': 10,
    'userName': 'astaddon9',
    'firstName': 'Alysia',
    'surname': 'Staddon',
    'email': 'astaddon9@google.com'
  }
];
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