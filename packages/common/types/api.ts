import { ZodError } from 'zod';
import { LoginUserSchema, RegisterUserSchema } from '../validators';
import { AnonymizedUser } from './entities';

export type ResponseError = { error: true; message: string } | ZodError;

export type RequestAuthGet = Record<string, never>;
export type ResponseAuthGet = { user: AnonymizedUser };

export type RequestAuthCreate = RegisterUserSchema;
export type ResponseAuthCreate = { message: 'ok' };

export type RequestAuthLogin = LoginUserSchema;
export type ResponseAuthLogin = { message: 'ok' };

export type RequestAuthLogout = Record<string, never>;
export type ResponseAuthLogout = { message: 'ok' };
