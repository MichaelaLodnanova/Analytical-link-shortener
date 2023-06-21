import { Result } from '@badrap/result';
import { DateLessAdvertisement, PResult } from 'common';
import { Advertisement, Role, client } from 'model';
import {
  checkAdvertisement,
  checkAdvertisementWithAccess,
  checkUser,
} from './common';
import { AccessRightsError } from './errors';
import { formatISO } from 'date-fns';
import {
  CreateAdvertisementData,
  DeleteAdvertisementData,
  GetAdvertisementData,
  GetAllAdvertisementsData,
  UpdateAdvertisementData,
} from '../types/advertisement';

/**
 * Repository call that retrieves an advertisement.
 *
 * @param data object containing necessary data to retrieve an advertisement record
 * @returns - `Result.ok(DateLessAdvertisement[])` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified advertisement does not exist!')
 *            - DeletedRecordError('The specified advertisement has already been deleted!')
 *            - Generic prisma error
 */
export const getAdvertisementById: (
  data: GetAdvertisementData
) => PResult<Advertisement> = async (data) => {
  try {
    const check = await checkAdvertisement(data, client);

    if (check.isErr) {
      return Result.err(check.error);
    }

    const advertisement = await client.advertisement.findUniqueOrThrow({
      where: {
        id: data.id,
      },
    });

    return Result.ok(advertisement);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Repository call that retrieves all advertisement or all advertisments af specified user.
 *
 * @param data object containing id of requester and possibly id of specific user
 * @returns - `Result.ok(DateLessAdvertisement[])` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified user does not exist!')
 *            - DeletedRecordError('The specified user has already been deleted!')
 *            - AccessRightsError('Only admin and owner can retrieve all advertisements [of specific user]')
 *            - Generic prisma error
 */
export const getAllAdvertismentsByUserId: (
  data: GetAllAdvertisementsData
) => PResult<DateLessAdvertisement[]> = async (data) => {
  try {
    // check requester access rights
    // we presume that requester exists and is not deleted
    const requester = await client.user.findUniqueOrThrow({
      where: {
        id: data.requesterId,
      },
      select: {
        role: true,
      },
    });

    if (requester.role !== Role.ADMIN) {
      if (!data.userId) {
        return Result.err(
          new AccessRightsError(
            'Only admin and owner can retrieve all advertisements'
          )
        );
      }
      if (data.requesterId !== data.userId) {
        return Result.err(
          new AccessRightsError(
            'Only admin and owner can retrieve all advertisements of specific user'
          )
        );
      }
      const check = await checkUser({ id: data.userId }, client);

      if (check.isErr) {
        return Result.err(check.error);
      }
    }

    const advertisements = await client.advertisement.findMany({
      where: {
        createdById: data.userId ? data.userId : undefined,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        adUrl: true,
        forwardUrl: true,
        createdById: true,
      },
    });

    return Result.ok(advertisements);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Repository call that creates new advertisement.
 *
 * @param data object containing necessary data to create an new advertisement record
 * @returns - `Result.ok(DateLessAdvertisement[])` on success
 *          - `Result.err(_)` on failure
 *            - Generic prisma error
 */
export const createNewAdvertisement: (
  data: CreateAdvertisementData
) => PResult<DateLessAdvertisement> = async (data) => {
  try {
    const newAdvertisement = await client.advertisement.create({
      data: {
        createdById: data.createdById,
        title: data.title,
        adUrl: data.adUrl,
        forwardUrl: data.forwardUrl,
      },
      select: {
        id: true,
        title: true,
        adUrl: true,
        forwardUrl: true,
        createdById: true,
      },
    });

    return Result.ok(newAdvertisement);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Repository call that updates advertisement.
 *
 * @param data object containing necessary data to update an advertisement record
 * @returns - `Result.ok(DateLessAdvertisement[])` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified advertisement does not exist!')
 *            - DeletedRecordError('The specified advertisement has already been deleted!')
 *            - AccessRightsError('Only admin and owner can access advertisements')
 *            - Generic prisma error
 */
export const updateAdvertisementById: (
  data: UpdateAdvertisementData
) => PResult<DateLessAdvertisement> = async (data) => {
  try {
    const check = await checkAdvertisementWithAccess(
      {
        id: data.id,
        requesterId: data.requesterId,
      },
      client
    );

    if (check.isErr) {
      return Result.err(check.error);
    }

    const updatedAdvertisement = await client.advertisement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title ? data.title : undefined,
        adUrl: data.adUrl ? data.adUrl : undefined,
        forwardUrl: data.forwardUrl ? data.forwardUrl : undefined,
      },
      select: {
        id: true,
        title: true,
        adUrl: true,
        forwardUrl: true,
        createdById: true,
      },
    });

    return Result.ok(updatedAdvertisement);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Repository call that deletes advertisement.
 *
 * @param data object containing necessary data to delete an advertisement record
 * @returns - `Result.ok(DateLessAdvertisement[])` on success
 *          - `Result.err(_)` on failure
 *            - NonexistentRecordError('The specified advertisement does not exist!')
 *            - DeletedRecordError('The specified advertisement has already been deleted!')
 *            - AccessRightsError('Only admin and owner can access advertisements')
 *            - Generic prisma error
 */
export const deleteAdvertisementById: (
  data: DeleteAdvertisementData
) => PResult<Advertisement> = async (data) => {
  try {
    const check = await checkAdvertisementWithAccess(
      {
        id: data.id,
        requesterId: data.requesterId,
      },
      client
    );

    if (check.isErr) {
      return Result.err(check.error);
    }

    const deletedAdvertisement = await client.advertisement.update({
      where: {
        id: data.id,
      },
      data: {
        deletedAt: formatISO(Date.now()),
      },
    });

    return Result.ok(deletedAdvertisement);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
