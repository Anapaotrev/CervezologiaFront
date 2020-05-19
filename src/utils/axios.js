import axios from 'axios';
import Cookies from 'js-cookie';
import { getStoredUserAuth, USER_SESSION } from './helpers';

axios.interceptors.request.use(
  (config) => {
    const user = getStoredUserAuth();
    if (!user) {
      return config;
    }
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Cookies.remove(USER_SESSION);
      window.location.href = "/";
    }
    return error;
  }
);

export default axios;
