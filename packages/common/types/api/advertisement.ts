import {
  CreateAdvertisementSchema,
  UpdateAdvertisementBodySchema,
} from '../../validators';
import { DateLessAdvertisement } from '../entities';
import { SuccessResponse } from './utils';

export type RequestAdvertisementIdParams = Record<string, unknown>;

export type ResponseAllAdvertisementsGet = SuccessResponse<
  DateLessAdvertisement[]
>;
export type RequestAdvertisementPostReqBody = CreateAdvertisementSchema;

export type RequestAdvertisementPatchReqBody = UpdateAdvertisementBodySchema;
export type ResponseAdvertisementGet = SuccessResponse<DateLessAdvertisement>;
export type ResponseAdvertisementPatch = SuccessResponse<unknown>;
export type ResponseAdvertisementPost = SuccessResponse<DateLessAdvertisement>;
export type ResponseAdvertisementDelete =
  SuccessResponse<DateLessAdvertisement>;
