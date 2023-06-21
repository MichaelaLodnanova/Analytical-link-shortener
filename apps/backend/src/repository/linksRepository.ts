import { hash, argon2d } from 'argon2';
import { Buffer } from 'buffer';
import { Result } from '@badrap/result';
import { DateLessLink, PResult } from 'common';
import { Link, Role, client } from 'model';
import {
  GetAllLinksData,
  GetLinkData,
  LinkCreateData,
  LinkDeleteData,
  LinkUpdateData,
} from '../types/link';
import { checkLink, checkLinkWithAccess, checkUser } from './common';
import { AccessRightsError } from './errors';
import { formatISO } from 'date-fns';

/**
 * Get link by id
 * @param id link id
 * @returns dateless link entity
 */
export const getLinkById: (data: GetLinkData) => PResult<DateLessLink> = async (
  data
) => {
  try {
    const check = await checkLink(data, client);

    if (check.isErr) {
      return Result.err(check.error);
    }

    const link = await client.link.findUniqueOrThrow({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        url: true,
        shortId: true,
        isAdvertisementEnabled: true,
        createdById: true,
      },
    });

    return Result.ok(link);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Get link by id
 * @param id link id
 * @returns dateless link entity
 */
export const getAllLinksByUserId: (
  data: GetAllLinksData
) => PResult<DateLessLink[]> = async (data) => {
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
    })

    if (data.requesterId !== data.userId && requester.role !== Role.ADMIN) {
      return Result.err(new AccessRightsError('Only admin and owner can retrieve all links'));
    }

    const check = await checkUser({ id: data.userId }, client);

    if (check.isErr) {
      return Result.err(check.error);
    }

    const links = await client.link.findMany({
      where: {
        createdById: data.userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        url: true,
        shortId: true,
        isAdvertisementEnabled: true,
        createdById: true,
      },
    });

    return Result.ok(links);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Repository call that creates new link.
 *
 * @param data object containing necessary data to create a new link record
 * @returns - On success: the created link record
 *          - On failure: a generic error
 */
export const createNewLink: (
  data: LinkCreateData
) => PResult<DateLessLink> = async (data) => {
  try {
    const shortId = await hash(data.url, { hashLength: 15, type: argon2d, raw: true });
    const shortIdBase64 = shortId.toString('base64url');

    // to be bullet proof check into db should be made

    const newLink = await client.link.create({
      data: {
        createdById: data.createdById,
        url: data.url,
        shortId: shortIdBase64,
        isAdvertisementEnabled: data.isAdvertisementEnabled,
      },
      select: {
        id: true,
        url: true,
        shortId: true,
        isAdvertisementEnabled: true,
        createdById: true,
      },
    });

    return Result.ok(newLink);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Update link by id
 * @param id link id
 * @returns dateless link entity
 */
export const updateLinkById: (
  data: LinkUpdateData
) => PResult<DateLessLink> = async (data) => {
  try {
    const check = await checkLinkWithAccess({
      id: data.id,
      requesterId: data.requesterId
    }, client);

    if (check.isErr) {
      return Result.err(check.error);
    }

    const updatedLink = await client.link.update({
      where: {
        id: data.id,
      },
      data: {
        isAdvertisementEnabled: data.isAdvertisementEnabled,
      },
      select: {
        id: true,
        url: true,
        shortId: true,
        isAdvertisementEnabled: true,
        createdById: true,
      },
    });

    return Result.ok(updatedLink);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Delete link by id
 * @param id link id
 * @returns dateless link entity
 */
export const deleteLinkById: (
  data: LinkDeleteData
) => PResult<Link> = async (data) => {
  try {
    const check = await checkLinkWithAccess({
      id: data.id,
      requesterId: data.requesterId
    }, client);

    if (check.isErr) {
      return Result.err(check.error);
    }

    const deletedLink = await client.link.update({
      where: {
        id: data.id,
      },
      data: {
        deletedAt: formatISO(Date.now()),
      }
    });

    return Result.ok(deletedLink);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
