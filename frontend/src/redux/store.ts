import { configureStore } from '@reduxjs/toolkit';
import listReducer from 'redux/slices/box/boxesSlice';
import boxReducer from 'redux/slices/box/boxSlice';
import deliveryListReducer from 'redux/slices/delivery/deliveriesSlice';
import deliveryReducer from 'redux/slices/delivery/deliverySlice';
import userReducer from 'redux/slices/user/userSlice';
import loggedUserReducer from 'redux/slices/loggedUser/loggedUserSlice';

export const store = configureStore({
  reducer: {
    boxes: listReducer,
    box: boxReducer,
    deliveries: deliveryListReducer,
    delivery: deliveryReducer,
    user: userReducer,
    loggedUser: loggedUserReducer,
  },
});
