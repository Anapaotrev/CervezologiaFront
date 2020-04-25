import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from './userContext';

// eslint-disable-next-line import/prefer-default-export
export const PrivateRoute = ({ children, ...rest }) => {
  const auth = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => (auth.isAuth() ? children : <Redirect to={{ pathname: '/login' }} />)}
    />
  );
};
