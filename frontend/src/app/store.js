import { configureStore } from '@reduxjs/toolkit';
import listReducer from '../components/boxes/boxesSlice/BoxesSlice';

export const store = configureStore({
  reducer: {
    boxes: listReducer,
  },
});
