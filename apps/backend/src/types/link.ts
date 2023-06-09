import { PaginationSchema } from 'common';

export type GetLinkData = {
  id: string;
};
export type GetAllLinksData = {
  userId?: string;
  requesterId?: string;
} & PaginationSchema;
export type CreateLinkData = {
  createdById: string;
  url: string;
  isAdvertisementEnabled: boolean;
};
export type UpdateLinkData = {
  id: string;
  requesterId: string;
  isAdvertisementEnabled?: boolean;
};
export type DeleteLinkData = {
  id: string;
  requesterId: string;
};
