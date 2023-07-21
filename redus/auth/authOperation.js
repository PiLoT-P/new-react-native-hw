import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  registerServer,
  loginServer,
  logoutServer,
} from '../../service/firebase';

export const register = createAsyncThunk(
  'auth/register',
  async ({ avatar, name, email, password }, { rejectWithValue }) => {
    try {
      const userData = await registerServer({ avatar, name, email, password });
      return {
        user: {
          uid: userData.stsTokenManager.uid,
          name: userData.displayName,
          email: userData.email,
          avatar: userData.photoURL,
        },
        token: userData.stsTokenManager.accessToken,
        refreshToken: userData.stsTokenManager.refreshToken
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, { rejectWithValue}) => {
    try {
      const userData = await loginServer({email, password});
      return {
        user: {
          uid: userData.stsTokenManager.uid,
          name: userData.displayName,
          email: userData.email,
          avatar: userData.photoURL,
        },
        token: userData.stsTokenManager.accessToken,
        refreshToken: userData.stsTokenManager.refreshToken
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue}) => {
    try {
      await logoutServer();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);