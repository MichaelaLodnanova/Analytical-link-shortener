import { User } from 'model';
import { OmitDates } from './utils';

export type AnonymizedUser = OmitDates<Omit<User, 'passwordHash'>>;
