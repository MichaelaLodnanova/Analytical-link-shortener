import {
  DateLessAdvertisement,
  DateLessLink,
  PResult,
  PaginatedLink,
} from 'common';
import {
  getAllLinksByUserId,
  getLinkById,
  createNewLink,
  updateLinkById,
  deleteLinkById,
  getLinkByShortId,
} from '../repository/linksRepository';
import {
  GetLinkData,
  GetAllLinksData,
  CreateLinkData,
  DeleteLinkData,
  UpdateLinkData,
} from '../types/link';
import { Link } from 'model';
import { Result } from '@badrap/result';
import { createLinkStatistic } from '../repository/linkStatsRepository';
import { pickAdvertisement } from './advertiser';

export const getLink: (data: GetLinkData) => PResult<DateLessLink> = async ({
  id,
}) => {
  const link = await getLinkById({ id });

  return link;
};

export type ViewLinkData = {
  link: DateLessLink;
  advertisement?: Result<DateLessAdvertisement>;
};

export const viewLink: (data: {
  shortId: string;
  region: string;
  language: string;
}) => PResult<ViewLinkData> = async ({ shortId, region, language }) => {
  const linkResult = await getLinkByShortId({ id: shortId });

  if (linkResult.isErr) {
    return Result.err(linkResult.error);
  }

  const link = linkResult.value;

  await createLinkStatistic({
    linkId: link.id,
    region,
    language,
  });

  if (!link.isAdvertisementEnabled) {
    return Result.ok({ link: link });
  }

  const advertisement = await pickAdvertisement();

  return Result.ok({ link: link, advertisement: advertisement });
};

export const getAllLinks: (
  data: GetAllLinksData
) => PResult<PaginatedLink> = async (data) => {
  const link = await getAllLinksByUserId(data);

  return link;
};

export const createLink: (
  data: CreateLinkData
) => PResult<DateLessLink> = async (data) => {
  const createdLink = await createNewLink(data);

  return createdLink;
};

export const updateLink: (
  data: UpdateLinkData
) => PResult<DateLessLink> = async (data) => {
  const updatedLink = await updateLinkById(data);

  return updatedLink;
};

export const deleteLink: (data: DeleteLinkData) => PResult<Link> = async (
  data
) => {
  const deletedLink = await deleteLinkById(data);

  return deletedLink;
};
