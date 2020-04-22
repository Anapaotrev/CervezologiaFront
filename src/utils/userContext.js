import React, { createContext } from 'react';
import { getStoredUserAuth, useAuthHandler } from '.';
import { DEFAULT_USER_AUTH } from '../constants';

export const UserContext = createContext({
  auth: DEFAULT_USER_AUTH,
  setAuthStatus: () => {},
  setUnauthStatus: () => {},
  isAuth: () => {},
});

const { Provider } = UserContext;

const UserProvider = ({ children }) => {
  const { auth, setAuthStatus, setUnauthStatus, isAuth } = useAuthHandler(getStoredUserAuth());

  return <Provider value={{ auth, setAuthStatus, setUnauthStatus, isAuth }}>{children}</Provider>;
};

export default UserProvider;
