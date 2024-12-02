import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  token: string;
};

const initialState: UserState = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  photo: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state._id = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.photo = '';
      state.token = '';
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
