import {
  CreateAdvertisementSchema,
  PaginationSchema,
  UpdateAdvertisementBodySchema,
} from '../../validators';
import { DateLessAdvertisement } from '../entities';
import { SuccessResponse } from './utils';

export type RequestAdvertisementIdParams = {
  id?: string;
};

export type RequestAllAdvertisementsIdParams = {
  userId?: string;
};

export type RequestAllAdvertisementsGetQuery = PaginationSchema;
export type ResponseAllAdvertisementsGet = SuccessResponse<{
  advertisements: DateLessAdvertisement[];
  next: { limit?: number; offset?: number };
}>;
export type RequestAdvertisementPostReqBody = CreateAdvertisementSchema;

export type RequestAdvertisementPatchReqBody = UpdateAdvertisementBodySchema;
export type ResponseAdvertisementGet = SuccessResponse<DateLessAdvertisement>;
export type ResponseAdvertisementPatch = SuccessResponse<unknown>;
export type ResponseAdvertisementPost = SuccessResponse<DateLessAdvertisement>;
export type ResponseAdvertisementDelete =
  SuccessResponse<DateLessAdvertisement>;
