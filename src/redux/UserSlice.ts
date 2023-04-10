import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserDocument } from '../types/interfaces';

const initialUser: IUserDocument = {
  _id: '',
  name: '',
  googleId: '',
  email: '',
  avatar: '',
  images: []
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialUser
  },
  reducers: {
    setAuthenticatedUser: (
      state,
      action: PayloadAction<{ user: IUserDocument }>
    ) => {
      if (state) {
        state.user = action.payload.user;
      }
    },
    clearUserInfo: state => {
      state.user = initialUser;
    }
  }
});

export const { setAuthenticatedUser, clearUserInfo } = UserSlice.actions;

export default UserSlice.reducer;
