import { Result } from '@badrap/result';

export type OmitDates<T extends object> = Omit<
  T,
  'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type PResult<T> = Promise<Result<T>>;

export type KeysMatching<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: P;
};
