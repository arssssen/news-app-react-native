import * as LocalAuthentication from 'expo-local-authentication';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clearFavorites } from '../../../features/toggle-favorite/model/favoritesSlice';
import { baseApi } from '../../../shared/api/baseApi';
import type { RootState } from '../../../app/store';

type AuthStatus =
  | 'idle'
  | 'checking'
  | 'authenticated'
  | 'unauthenticated'
  | 'unsupported';

type AuthState = {
  isAuthenticated: boolean;
  status: AuthStatus;
  errorMessage: string | null;
  supportMessage: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  errorMessage: null,
  supportMessage: null,
};

function normalizeBoolean(value: unknown): boolean {
  return value === true || value === 'true';
}

const AUTH_PROMPT_MESSAGE = 'Authenticate to access the app';

async function runBiometricAuth() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return {
      supported: false,
      reason: 'Biometric authentication is unavailable on this device.',
    } as const;
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: AUTH_PROMPT_MESSAGE,
    disableDeviceFallback: false,
    cancelLabel: 'Cancel',
  });

  return {
    supported: true,
    result,
  } as const;
}

export const authenticateOnLaunch = createAsyncThunk(
  'auth/authenticateOnLaunch',
  async () => {
    const auth = await runBiometricAuth();
    return auth;
  },
);

export const authenticateWithBiometrics = createAsyncThunk(
  'auth/authenticateWithBiometrics',
  async () => {
    const auth = await runBiometricAuth();
    return auth;
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await dispatch(clearFavorites());
    dispatch(baseApi.util.resetApiState());
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateOnLaunch.pending, (state) => {
        state.status = 'checking';
        state.errorMessage = null;
        state.supportMessage = null;
      })
      .addCase(authenticateOnLaunch.fulfilled, (state, action) => {
        if (!action.payload.supported) {
          state.status = 'unsupported';
          state.isAuthenticated = true;
          state.supportMessage = action.payload.reason;
          return;
        }

        if (action.payload.result.success) {
          state.status = 'authenticated';
          state.isAuthenticated = true;
          state.errorMessage = null;
          return;
        }

        state.status = 'unauthenticated';
        state.isAuthenticated = false;
        state.errorMessage = 'Authentication failed. Please try again.';
      })
      .addCase(authenticateOnLaunch.rejected, (state) => {
        state.status = 'unauthenticated';
        state.isAuthenticated = false;
        state.errorMessage = 'Unable to run biometric authentication.';
      })
      .addCase(authenticateWithBiometrics.pending, (state) => {
        state.status = 'checking';
        state.errorMessage = null;
      })
      .addCase(authenticateWithBiometrics.fulfilled, (state, action) => {
        if (!action.payload.supported) {
          state.status = 'unsupported';
          state.isAuthenticated = true;
          state.supportMessage = action.payload.reason;
          return;
        }

        if (action.payload.result.success) {
          state.status = 'authenticated';
          state.isAuthenticated = true;
          state.errorMessage = null;
          return;
        }

        state.status = 'unauthenticated';
        state.isAuthenticated = false;
        state.errorMessage = 'Authentication failed. Please try again.';
      })
      .addCase(authenticateWithBiometrics.rejected, (state) => {
        state.status = 'unauthenticated';
        state.isAuthenticated = false;
        state.errorMessage = 'Unable to run biometric authentication.';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'unauthenticated';
        state.isAuthenticated = false;
        state.errorMessage = null;
      });
  },
});

export const authReducer = authSlice.reducer;

export const selectIsAuthenticated = (state: RootState): boolean =>
  normalizeBoolean(state.auth.isAuthenticated);
export const selectAuthStatus = (state: RootState): AuthStatus => state.auth.status;
export const selectAuthErrorMessage = (state: RootState): string | null =>
  state.auth.errorMessage;
export const selectAuthSupportMessage = (state: RootState): string | null =>
  state.auth.supportMessage;
