export type GetLinkData = {
  id: string;
};
export type GetAllLinksData = {
  userId: string;
  requesterId: string;
};
export type LinkCreateData = {
  createdById: string;
  url: string;
  isAdvertisementEnabled: boolean;
};
export type LinkUpdateData = {
  id: string;
  requesterId: string;
  isAdvertisementEnabled: boolean;
};
export type LinkDeleteData = {
  id: string;
  requesterId: string;
};
