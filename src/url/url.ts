export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const URLS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
  },
  DASHBOARD: {
    GET_OVERVIEW: '/dashboard/overview',
    REFRESH: '/dashboard/refresh',
  },
  MASTER: {
    USERS: '/master/users',
    ROLES: '/master/roles',
    PRODUCTS: '/master/products',
    CUSTOMERS: '/master/customers',
    INVENTORY: '/master/inventory',
    ORDERS: '/master/orders',
  },
};

export default URLS;
