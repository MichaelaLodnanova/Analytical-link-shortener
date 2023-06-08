import { Result } from '@badrap/result';

export type OmitDates<T extends object> = Omit<
  T,
  'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type PResult<T> = Promise<Result<T>>;
