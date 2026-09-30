import axiosClient from '../../../axios/axiosClient';
import { URLS } from '../../../url/url';

export interface LoginPayload {
  identifier: string; // Phone or Email
  password: string;
}

export const loginUserAPI = (data: LoginPayload) => {
  return axiosClient.post(URLS.AUTH.LOGIN, {
    identifier: data.identifier,
    password: data.password,
  });
};
