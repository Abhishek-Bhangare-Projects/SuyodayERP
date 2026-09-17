import dayjs, { type Dayjs } from 'dayjs';

export const MenuResources = {
  dashboard: 'dashboard',
  users: 'users',
  roles: 'roles',
  customers: 'customers',
  products: 'products',
  inventory: 'inventory',
  orders: 'orders',
  manufacturing: 'manufacturing',
  logistics: 'logistics',
  reports: 'reports',
  systemconfig: 'systemconfig',
};

export type MenuResource = keyof typeof MenuResources | string;

export const parseToDayjs = (
  input?: string | number | Date | Dayjs | null
): Dayjs | null => {
  if (!input || input === '' || input === 'null' || input === 'undefined') return null;

  if (dayjs.isDayjs(input)) {
    return input.isValid() ? input : null;
  }

  if (typeof input === 'number') {
    if (input >= 1000 && input <= 9999) {
      const d = dayjs(new Date(input, 0, 1));
      return d.isValid() ? d : null;
    }
    const d = dayjs(input);
    return d.isValid() ? d : null;
  }

  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!trimmed) return null;

    if (/^\d{4}$/.test(trimmed)) {
      const d = dayjs(new Date(Number(trimmed), 0, 1));
      return d.isValid() ? d : null;
    }

    const parts = trimmed.split('-').map(Number);

    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      const d = dayjs(new Date(parts[0], parts[1] - 1, parts[2]));
      return d.isValid() ? d : null;
    }

    if (/^\d{2}-\d{2}-\d{4}$/.test(trimmed)) {
      const d = dayjs(new Date(parts[2], parts[1] - 1, parts[0]));
      return d.isValid() ? d : null;
    }

    const d = dayjs(trimmed);
    return d.isValid() ? d : null;
  }

  const d = dayjs(input);
  return d.isValid() ? d : null;
};

export const textInputOnly = (value: string = '') => {
  return value.replace(/[^a-zA-Z ]/g, '').replace(/^\s+/, '');
};

export const alphaNumericOnly = (value: string = '') => {
  return value.replace(/[^a-zA-Z0-9]/g, '');
};

export const alphaNumericUpperOnly = (value: string = '') => {
  return (value || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
};

export const mobileNumberOnly = (value: string = '') => {
  return (value || '').replace(/\D/g, '').replace(/^[0-5]+/, '');
};

export const emailOnly = (value: string = '') => {
  return (value || '').replace(/[^a-zA-Z0-9@._+-]/g, '').trim();
};

export const cleanText = (value: string = '') => {
  return (value || '').replace(/^\s+/, '');
};

export const formatCurrency = (amount?: number | string) => {
  if (amount === undefined || amount === null || amount === '') return '₹0.00';
  const num = Number(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(isNaN(num) ? 0 : num);
};
