/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'types';

const LOCAL_STORAGE_USER_DATA_KEY = 'ASE_DELIVERY_LOGGED_USER_DATA';

const getUserStatus = () => {
  const storedData = window.localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
  const user = storedData !== null && storedData !== undefined && storedData !== 'undefined' ? JSON.parse(storedData) : undefined;
  return { loggedIn: user !== undefined, user: user };
};

export const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: getUserStatus(),
  reducers: {
    updateLoggedUser: (state, action) => {
      // Store user data in local storage
      window.localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, JSON.stringify(action.payload));
      state.loggedIn = action.payload !== undefined;
      state.user = action.payload;
    },
  },
});


export const { updateLoggedUser } = loggedUserSlice.actions;
export const isLoggedIn: (state: any) => boolean = (state: any) => state.loggedUser.loggedIn;
export const loggedUser: (state: any) => User = (state: any) => state.loggedUser.user;
export default loggedUserSlice.reducer;