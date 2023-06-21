import { PaginationSchema } from '../../validators/paginationZod';
import { AnonymizedAdvertisement } from '../entities';
import { SuccessResponse } from './utils';

export type RequestAdvertisementsGet = PaginationSchema;
export type ResponseAdvertisementsGet = SuccessResponse<{
  next: PaginationSchema;
  links: AnonymizedAdvertisement[];
}>;
