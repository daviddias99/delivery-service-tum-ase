import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STORAGE_USER_DATA_KEY = 'ASE_DELIVERY_LOGGED_USER_DATA';

const getUserStatus = () => {
  const storedData = window.localStorage.getItem(LOCAL_STORAGE_USER_DATA_KEY);
  console.log(storedData);
  const user = storedData !== null && storedData !== undefined && storedData !== 'undefined' ? JSON.parse(storedData) : {};
  return { loggedIn: user !== {}, user: user };
};

export const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: getUserStatus(),
  reducers: {
    updateLoggedUser: (state, action) => {
      // Store user data in local storage
      window.localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, JSON.stringify(action.payload));
      state.loggedIn = action.payload !== {};
      state.user = action.payload;
    },
  },
});


export const { updateLoggedUser } = loggedUserSlice.actions;
export const isLoggedIn = (state: any) => state.loggedUser.loggedIn;
export const loggedUser = (state: any) => state.loggedUser.user;
export default loggedUserSlice.reducer;