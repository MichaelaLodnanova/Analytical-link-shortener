import axios from 'axios';
import { RequestAuthLogin, ResponseAuthGet, ResponseAuthLogout } from 'common';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true,
});

export const login = async (data: RequestAuthLogin) => {
  const resp = await apiClient.post('/auth/login', {
    username: data.username,
    password: data.password,
  });
  return resp.data;
};

export const auth = async () => {
  const resp = await apiClient.get<ResponseAuthGet>('/auth', {});
  return resp.data;
};

export const logout = async () => {
  const resp = await apiClient.post<ResponseAuthLogout>('/auth/logout', {});
  return resp.data;
};

export default apiClient;
