import { configureStore } from '@reduxjs/toolkit';
import listReducer from 'components/boxes/boxesSlice/BoxesSlice';
import boxReducer from 'components/box/Box/boxSlice/boxSlice';

export const store = configureStore({
  reducer: {
    boxes: listReducer,
    box: boxReducer,
  },
});
