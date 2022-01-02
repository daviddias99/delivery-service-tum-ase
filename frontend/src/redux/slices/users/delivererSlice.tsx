import { createSlice } from '@reduxjs/toolkit';
const delivererList = [
  {
    'id': 1,
    'userName': 'nblindmann0',
    'firstName': 'Nani',
    'surname': 'Blindmann',
    'email': 'nblindmann0@technorati.com'
  }, {
    'id': 2,
    'userName': 'asponton1',
    'firstName': 'Alida',
    'surname': 'Sponton',
    'email': 'asponton1@tmall.com'
  }, {
    'id': 3,
    'userName': 'pcordeau2',
    'firstName': 'Pooh',
    'surname': 'Cordeau]',
    'email': 'pcordeau2@cnet.com'
  }, {
    'id': 4,
    'userName': 'wmeineken3',
    'firstName': 'Wilfred',
    'surname': 'Meineken',
    'email': 'wmeineken3@ihg.com'
  }, {
    'id': 5,
    'userName': 'strimble4',
    'firstName': 'Shea',
    'surname': 'Trimble',
    'email': 'strimble4@eventbrite.com'
  }, {
    'id': 6,
    'userName': 'tnarraway5',
    'firstName': 'Tamar',
    'surname': 'Narraway',
    'email': 'tnarraway5@pen.io'
  }, {
    'id': 7,
    'userName': 'flipgens6',
    'firstName': 'Forest',
    'surname': 'Lipgens',
    'email': 'flipgens6@51.la'
  }, {
    'id': 8,
    'userName': 'nfortin7',
    'firstName': 'Nicole',
    'surname': 'Fortin',
    'email': 'nfortin7@disqus.com'
  }, {
    'id': 9,
    'userName': 'gtantum8',
    'firstName': 'Gordy',
    'surname': 'Tantum',
    'email': 'gtantum8@ocn.ne.jp'
  }, {
    'id': 10,
    'userName': 'dbaldwin9',
    'firstName': 'Deloria',
    'surname': 'Baldwin',
    'email': 'dbaldwin9@nifty.com'
  }
];

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