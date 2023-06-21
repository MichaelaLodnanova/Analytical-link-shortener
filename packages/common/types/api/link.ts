import {
  CreateLinkSchema,
  UpdateLinkBodySchema,
  ViewLinkSchema,
} from '../../validators';
import { PaginationSchema } from '../../validators/paginationZod';
import { DateLessLink } from '../entities';
import { SuccessResponse } from './utils';

export type RequestLinkIdParams = Record<string, unknown>;

export type RequestViewLinkParams = Record<string, unknown>;
export type RequestViewLinkBody = ViewLinkSchema;

export type RequestAllLinksGetQuery = PaginationSchema;
export type ResponseAllLinksGet = SuccessResponse<{
  next: PaginationSchema;
  links: DateLessLink[];
}>;
export type RequestLinkPostReqBody = CreateLinkSchema;

export type RequestLinkPatchReqBody = UpdateLinkBodySchema;
export type ResponseLinkGet = SuccessResponse<DateLessLink>;
export type ResponseLinkPatch = SuccessResponse<DateLessLink>;
export type ResponseLinkPost = SuccessResponse<DateLessLink>;
export type ResponseLinkDelete = SuccessResponse<DateLessLink>;
