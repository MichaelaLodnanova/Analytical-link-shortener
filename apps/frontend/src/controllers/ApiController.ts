import axios from 'axios';
import {
  RequestAuthCreate,
  RequestAuthLogin,
  RequestStatsAdsGet,
  RequestAuthUpdateUser,
  ResponseAuthGet,
  ResponseAuthLogout,
  ResponseStatsAdsGet,
  RequestStatsLinkGet,
  ResponseStatsLinkGet,
} from 'common';
import { sanitizeSearchParams } from '../utils/helpers';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
  withCredentials: true,
});

export const login = async (data: RequestAuthLogin) => {
  const resp = await apiClient.post<RequestAuthLogin>('/auth/login', {
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

export const register = async (data: RequestAuthCreate) => {
  const resp = await apiClient.post<RequestAuthCreate>('/auth/registration', {
    username: data.username,
    email: data.email,
    role: data.role,
    name: '',
    surname: '',
    password: data.password,
  });
  return resp.data;
};

export const update = async (data: RequestAuthUpdateUser) => {
  const resp = await apiClient.put<RequestAuthUpdateUser>('/auth', {
    name: data.name,
    surname: data.surname,
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  });
  return resp.data;
};

export const adStatistics = async (data: RequestStatsAdsGet) => {
  const resp = await apiClient.get<ResponseStatsAdsGet>(
    `/stats/advertisement?${new URLSearchParams(
      sanitizeSearchParams(data)
    ).toString()}`
  );

  return resp.data;
};

export const linkStatistics = async (data: RequestStatsLinkGet) => {
  const resp = await apiClient.get<ResponseStatsLinkGet>(
    `/stats/link?${new URLSearchParams(sanitizeSearchParams(data)).toString()}`
  );

  return resp.data;
};

export default apiClient;
