import { PaginationSchema } from '../../validators/paginationZod';
import { AnonymizedLink } from '../entities';
import { SuccessResponse } from './utils';

export type RequestLinksGet = PaginationSchema;
export type ResponseLinksGet = SuccessResponse<{
  next: PaginationSchema;
  links: AnonymizedLink[];
}>;
