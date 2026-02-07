import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux';
import {
  authenticateWithBiometrics,
  logout,
  selectAuthErrorMessage,
  selectAuthStatus,
  selectAuthSupportMessage,
  selectIsAuthenticated,
} from './authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);
  const errorMessage = useAppSelector(selectAuthErrorMessage);
  const supportMessage = useAppSelector(selectAuthSupportMessage);

  const retryAuth = useCallback(() => {
    void dispatch(authenticateWithBiometrics());
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    void dispatch(logout());
  }, [dispatch]);

  return {
    isAuthenticated,
    status,
    errorMessage,
    supportMessage,
    retryAuth,
    logoutUser,
  };
}
