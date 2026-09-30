import axios from 'axios';
import { logout } from '../redux/authSlice';

let appStore: any;

export const injectStore = (_store: any) => {
  appStore = _store;
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (appStore) {
        appStore.dispatch(logout());
      }

      const currentPath = window.location.pathname;
      if (!currentPath.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
