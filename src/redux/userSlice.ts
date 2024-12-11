import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

export interface UserState {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  token: string;
  onlineUsers: string[];
  socketConnection: Socket | null;
}

const initialState: UserState = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  photo: '',
  token: '',
  onlineUsers: [],
  socketConnection: null,
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
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  logout,
  setOnlineUsers,
  setSocketConnection,
} = userSlice.actions;

export default userSlice.reducer;
