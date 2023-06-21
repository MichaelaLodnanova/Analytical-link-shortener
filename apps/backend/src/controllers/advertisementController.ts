import { DateLessAdvertisement, PResult } from 'common';
import {
  createNewAdvertisement,
  deleteAdvertisementById,
  getAdvertisementById,
  getAllAdvertismentsByUserId,
  updateAdvertisementById,
} from '../repository/advertisementRepository';
import {
  GetAdvertisementData,
  GetAllAdvertisementsData,
  CreateAdvertisementData,
  DeleteAdvertisementData,
  UpdateAdvertisementData,
} from '../types/advertisement';
import { Advertisement } from 'model';

export const getAdvertisement: (
  data: GetAdvertisementData
) => PResult<DateLessAdvertisement> = async ({ id }) => {
  const link = await getAdvertisementById({ id });

  return link;
};

export const getAllAdvertisments: (
  data: GetAllAdvertisementsData
) => PResult<DateLessAdvertisement[]> = async (data) => {
  const link = await getAllAdvertismentsByUserId(data);

  return link;
};

export const createAdvertisement: (
  data: CreateAdvertisementData
) => PResult<DateLessAdvertisement> = async (data) => {
  const createdLink = await createNewAdvertisement(data);

  return createdLink;
};

export const updateAdvertisement: (
  data: UpdateAdvertisementData
) => PResult<DateLessAdvertisement> = async (data) => {
  const updatedLink = await updateAdvertisementById(data);

  return updatedLink;
};

export const deleteAdvertisement: (
  data: DeleteAdvertisementData
) => PResult<Advertisement> = async (data) => {
  const deletedLink = await deleteAdvertisementById(data);

  return deletedLink;
};

// // crise impressions, viewtime
// export const SaveAdStats = () => {};
