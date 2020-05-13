import axios from 'axios';
import { getStoredUserAuth } from './helpers';

axios.defaults.headers.common.Authorization = `Bearer ${getStoredUserAuth().token}`;

export default axios;
