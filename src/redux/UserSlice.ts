import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setAuthenticatedUser: (state: { name: any; user: any }, action: {payload: any, type: string}) => {
      if (state) {
        state.name = action.payload.name;
        state.user = action.payload.user;
      }
    },
    clearUserInfo: (state: { name: any; user: any }, action: {payload: any, type: string}) => {
      state.name = null;
      state.user = null;
    }
  }
});

export const { setAuthenticatedUser, clearUserInfo } = UserSlice.actions;

export default UserSlice.reducer;
