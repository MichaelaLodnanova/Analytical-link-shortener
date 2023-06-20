import {
  LoginUserSchema,
  RegisterUserSchema,
  UpdateUserSchema,
} from '../../validators';
import { AnonymizedUser } from '../entities';
import { SuccessResponse } from './utils';

export type RequestAuthGet = Record<string, unknown>;
export type ResponseAuthGet = SuccessResponse<AnonymizedUser>;

export type RequestAuthCreate = RegisterUserSchema;
export type ResponseAuthCreate = SuccessResponse<unknown>;

export type RequestAuthLogin = LoginUserSchema;
export type ResponseAuthLogin = SuccessResponse<unknown>;

export type RequestAuthLogout = Record<string, never>;
export type ResponseAuthLogout = SuccessResponse<unknown>;

export type RequestAuthUpdateUser = UpdateUserSchema;
export type ResponseAuthUpdateUser = SuccessResponse<unknown>;
