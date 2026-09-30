import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  id?: string;
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  permissions?: string[];
  [key: string]: any;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  userData: UserData | null;
}

const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');
let parsedUser: UserData | null = null;
try {
  if (userStr) parsedUser = JSON.parse(userStr);
} catch (e) {
  parsedUser = null;
}

const initialState: AuthState = {
  token: token || null,
  isAuthenticated: Boolean(token),
  userData: parsedUser,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user?: UserData }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userData = action.payload.user || null;
      localStorage.setItem('token', action.payload.token);
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    updateUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = { ...state.userData, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.userData));
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, updateUserData, logout } = authSlice.actions;
export default authSlice.reducer;
