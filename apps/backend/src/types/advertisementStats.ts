export type CreateAdvertisementStatisticsData = {
  id?: string;
  advertisementId: string;
  linkId: string;
  skippedAt?: string;
  clickedAt?: string;
  region: string;
  language: string;
};

export type UpdateAdvertisementStatisticsData = {
  id: string;
  skippedAt?: string;
  clickedAt?: string;
};
