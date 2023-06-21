export type GetAdvertisementData = {
  id: string;
};
export type GetAllAdvertisementsData = {
  userId?: string;
  requesterId: string;
  limit?: number;
  offset?: number;
};
export type CreateAdvertisementData = {
  title: string;
  adUrl: string;
  forwardUrl: string;
  createdById: string;
};
export type UpdateAdvertisementData = {
  id: string;
  requesterId: string;
  title?: string;
  adUrl?: string;
  forwardUrl?: string;
};
export type DeleteAdvertisementData = {
  id: string;
  requesterId: string;
};
