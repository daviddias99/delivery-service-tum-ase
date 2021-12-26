import {createSlice } from '@reduxjs/toolkit';
import {Box} from 'types/index';

const initialState = {
  boxesList: [] as Box[],
  boxesSelected: [] as Box[],
};


export const boxesSlice = createSlice({
  name: 'box',
  initialState,
  reducers: {
    updateBoxes: (state, action) => {
      state.boxesList = action.payload;
    },

    updateSelectedBox: (state, action) => {
      state.boxesSelected = action.payload;
    },
  },
});


export const {updateBoxes, updateSelectedBox} = boxesSlice.actions;
export const boxesList = (state: any) => state.boxes.boxesList;
export const selectedBoxes = (state: any) => state.boxes.boxesSelected;
export default boxesSlice.reducer;