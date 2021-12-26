import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  deliveries: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
    updateUserDeliveries: (state, action) => {
      state.deliveries = action.payload;
    },
  },
});

export const { updateUser, updateUserDeliveries } = userSlice.actions;
export const userInfo = (state: any) => state.user.userInfo;
export const userDeliveries = (state: any) => state.user.deliveries;

export default userSlice.reducer;