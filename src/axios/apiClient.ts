import axiosClient from './axiosClient';

export const apiClient = {
  get: <T = any>(url: string, params?: any) =>
    axiosClient.get<T>(url, { params }).then((res) => res.data),

  post: <T = any>(url: string, data?: any) =>
    axiosClient.post<T>(url, data).then((res) => res.data),

  put: <T = any>(url: string, data?: any) =>
    axiosClient.put<T>(url, data).then((res) => res.data),

  patch: <T = any>(url: string, data?: any) =>
    axiosClient.patch<T>(url, data).then((res) => res.data),

  delete: <T = any>(url: string) =>
    axiosClient.delete<T>(url).then((res) => res.data),
};

export default apiClient;
