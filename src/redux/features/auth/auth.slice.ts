import type { RootState } from '@/redux/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  accessToken?: string;
} = {
  accessToken: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAuthInfo: (state) => {
      state.accessToken = undefined;
    },
  },
});

export const { setAuth, clearAuthInfo } = authSlice.actions;
export const authReducer = authSlice.reducer;

/* ------ Selectors ------ */
export const selectAuth = (state: RootState) => state.auth;
