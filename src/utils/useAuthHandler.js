import Cookies from 'js-cookie';
import { useState } from 'react';
import { DEFAULT_USER_AUTH } from '../constants';
import { USER_SESSION } from './helpers';

// eslint-disable-next-line import/prefer-default-export
export const useAuthHandler = (initialState) => {
  const [auth, setAuth] = useState(initialState);

  const setAuthStatus = (userAuth) => {
    Cookies.set(USER_SESSION, JSON.stringify(userAuth));
    setAuth(userAuth);
  };

  const setUnauthStatus = () => {
    Cookies.remove(USER_SESSION);
    setAuth(DEFAULT_USER_AUTH);
  };

  const isAuth = () => {
    return auth._id !== 0;
  };

  return {
    auth,
    setAuthStatus,
    setUnauthStatus,
    isAuth,
  };
};