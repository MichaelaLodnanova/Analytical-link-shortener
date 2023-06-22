import { hash, argon2d } from 'argon2';
import { Result } from '@badrap/result';
import { DateLessLink, PResult, PaginatedLink } from 'common';
import { Link, client } from 'model';
import {
  GetAllLinksData,
  GetLinkData,
  CreateLinkData,
  DeleteLinkData,
  UpdateLinkData,
} from '../types/link';
import {
  checkLink,
  checkLinkShortId,
  checkLinkWithAccess,
  checkUser,
} from './common';
import { AccessRightsError } from './errors';

/**
 * Get link by id
 * @param id link id
 * @returns dateless link entity
 */
export const getLinkById: (data: GetLinkData) => PResult<Link> = async (
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
    });

    return Result.ok(link);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};

/**
 * Get link by short id
 * @param id link id
 * @returns dateless link entity
 */
export const getLinkByShortId: (
  data: GetLinkData
) => PResult<DateLessLink> = async (data) => {
  try {
    const check = await checkLinkShortId(data, client);

    if (check.isErr) {
      return Result.err(check.error);
    }

    const link = await client.link.findFirstOrThrow({
      where: {
        shortId: data.id,
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
) => PResult<PaginatedLink> = async (data) => {
  try {
    if (data.requesterId) {
      // all data can retrieve only admin
      if (!data.userId) {
        return Result.err(
          new AccessRightsError(
            'Only admin and owner can retrieve all advertisements'
          )
        );
      }
      // data of specific user can retrieve only that user or admin
      if (data.requesterId !== data.userId) {
        return Result.err(
          new AccessRightsError(
            'Only admin and owner can retrieve all advertisements of specific user'
          )
        );
      }
    }

    if (data.userId) {
      // check if the specified user exists
      const check = await checkUser({ id: data.userId }, client);

      if (check.isErr) {
        return Result.err(check.error);
      }
    }

    let next = {};
    if (data.limit !== undefined && data.offset !== undefined) {
      next = { limit: data.limit, offset: data.offset + data.limit };
    }

    const links = await client.link.findMany({
      where: {
        ...(data.userId && { createdById: data.userId }),
        ...(data.search && {
          OR: [
            { url: data.search },
            { shortId: data.search },
            { url: { contains: data.search } },
            { shortId: { contains: data.search } },
          ],
        }),
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
      take: data.limit ?? data.limit,
      skip: data.offset ?? data.offset,
    });
    return Result.ok({
      links: links,
      next: next,
    });
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
  data: CreateLinkData
) => PResult<DateLessLink> = async (data) => {
  try {
    const shortId = await hash(data.url, {
      hashLength: 15,
      type: argon2d,
      raw: true,
    });
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
  data: UpdateLinkData
) => PResult<DateLessLink> = async (data) => {
  try {
    const check = await checkLinkWithAccess(
      {
        id: data.id,
        requesterId: data.requesterId,
      },
      client
    );

    if (check.isErr) {
      return Result.err(check.error);
    }

    const updatedLink = await client.link.update({
      where: {
        id: data.id,
      },
      data: {
        isAdvertisementEnabled:
          data.isAdvertisementEnabled ?? data.isAdvertisementEnabled,
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
export const deleteLinkById: (data: DeleteLinkData) => PResult<Link> = async (
  data
) => {
  try {
    const check = await checkLinkWithAccess(
      {
        id: data.id,
        requesterId: data.requesterId,
      },
      client
    );

    if (check.isErr) {
      return Result.err(check.error);
    }

    // should we delete also the stats?
    const deletedLink = await client.link.update({
      where: {
        id: data.id,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });

    return Result.ok(deletedLink);
  } catch (error) {
    console.error(error);
    return Result.err(error as Error);
  }
};
