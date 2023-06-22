import axios from 'axios';
import {
  RequestAdvertisementUserIdParams,
  RequestAllAdvertisementsGetQuery,
  RequestAllLinksGetQuery,
  RequestAuthCreate,
  RequestAuthLogin,
  RequestAuthUpdateUser,
  RequestLinkIdParams,
  RequestLinkPatchReqBody,
  RequestLinkUserIdParams,
  RequestStatsAdsGet,
  RequestStatsLinkGet,
  ResponseAdvertisementGet,
  ResponseAllAdvertisementsGet,
  ResponseAllLinksGet,
  ResponseAuthGet,
  ResponseAuthLogout,
  ResponseStatsAdsGet,
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

export const allAdvertisements = async ({
  userId,
  ...query
}: RequestAdvertisementUserIdParams & RequestAllAdvertisementsGetQuery) => {
  const resp = await apiClient.get<ResponseAllAdvertisementsGet>(
    `/advertisement/all/${userId ? userId : ''}?${new URLSearchParams(
      sanitizeSearchParams(query)
    ).toString()}`
  );

  return resp.data;
};

export const deleteAdvertisement = async (id: string) => {
  const resp = await apiClient.delete<ResponseAdvertisementGet>(
    `/advertisement/${id}`
  );

  return resp.data;
};

export const allLinks = async ({
  userId,
  ...query
}: RequestLinkUserIdParams & RequestAllLinksGetQuery) => {
  const resp = await apiClient.get<ResponseAllLinksGet>(
    `/link/all/${userId ? userId : ''}?${new URLSearchParams(
      sanitizeSearchParams(query)
    ).toString()}`
  );

  return resp.data;
};

export const deleteLink = async (id: string) => {
  const resp = await apiClient.delete<ResponseAdvertisementGet>(`/link/${id}`);

  return resp.data;
};

export const updateLink = async ({
  id,
  ...data
}: RequestLinkPatchReqBody & RequestLinkIdParams) => {
  const resp = await apiClient.patch<RequestLinkPatchReqBody>(
    `/link${id ? '/' + id : ''}`,
    data
  );

  return resp.data;
};

export default apiClient;
