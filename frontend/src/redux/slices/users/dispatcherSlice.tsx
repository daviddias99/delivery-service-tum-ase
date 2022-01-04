import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dispatchers: [],
  selectedDispatchers: []
};

export const dipatchersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    updateDispatchers: (state, action) => {
      state.dispatchers = action.payload;
    },
    updateSelectedDispatchers: (state, action) => {
      state.selectedDispatchers= action.payload;
    }

  },
});

export const { updateDispatchers, updateSelectedDispatchers } = dipatchersSlice.actions;
export const dispatchersList = (state: any) => state.dispatchers.dispatchers;
export const selectedDispatchersList = (state: any) => state.dispatchers.selectedDispatchers;
export default dipatchersSlice.reducer;