import { configureStore } from '@reduxjs/toolkit';
import listReducer from 'redux/slices/boxes/boxesSlice';
import boxReducer from 'redux/slices/box/boxSlice';
import deliveryListReducer from 'redux/slices/delivery/deliveriesSlice';

export const store = configureStore({
  reducer: {
    boxes: listReducer,
    box: boxReducer,
    deliveries: deliveryListReducer,
  },
});
