import Cookies from 'js-cookie';
import { DEFAULT_USER_AUTH } from '../constants';

export const USER_SESSION = 'i_sa_session_cervezologia';

export const getStoredUserAuth = () => {
  const auth = Cookies.get(USER_SESSION);
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};
