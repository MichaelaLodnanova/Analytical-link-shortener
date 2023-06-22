import { Advertisement, AdvertisementStatistics, Link, User } from 'model';
import { OmitDates } from './utils';

export type AnonymizedUser = OmitDates<Omit<User, 'passwordHash'>>;

export type DateLessLink = OmitDates<Link>;

export type PaginatedLink = {
  next?: {
    limit?: number;
    offset?: number;
  };
  links: DateLessLink[];
};

export type DateLessAdvertisement = OmitDates<Advertisement>;

export type PaginatedAdvertisement = {
  next?: {
    limit?: number;
    offset?: number;
  };
  advertisements: DateLessAdvertisement[];
};

export type DateLessAdvertisementStatistics =
  OmitDates<AdvertisementStatistics>;

export type OptionalAdvertisementStatistics = {
  id: string;
  advertisementId: string;
  linkId: string;
  skippedAt?: string | null;
  clickedAt?: string | null;
  region?: string;
  language?: string;
};

export type ViewLinkData = {
  link: DateLessLink;
  advertisement?: DateLessAdvertisement;
};
