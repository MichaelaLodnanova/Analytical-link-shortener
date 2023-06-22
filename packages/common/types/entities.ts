import { Advertisement, Link, User } from 'model';
import { OmitDates } from './utils';

export type AnonymizedUser = OmitDates<Omit<User, 'passwordHash'>>;

export type AnonymizedLink = OmitDates<Omit<Link, 'createdById'>>;

export type AnonymizedAdvertisement = OmitDates<
  Omit<Advertisement, 'createdById'>
>;
