import { DateLessLink, PResult } from 'common';
import {
  getAllLinksByUserId,
  getLinkById,
  createNewLink,
  updateLinkById,
  deleteLinkById,
} from '../repository/linksRepository';
import {
  GetAllLinksData,
  LinkCreateData,
  LinkDeleteData,
  LinkUpdateData,
} from '../types/link';

export const getLink: (data: { id: string }) => PResult<DateLessLink> = async ({
  id,
}) => {
  const link = await getLinkById({ id });

  return link;
};

export const getAllLinks: (
  data: GetAllLinksData
) => PResult<DateLessLink[]> = async (data) => {
  const link = await getAllLinksByUserId(data);

  return link;
};

export const createLink: (
  data: LinkCreateData
) => PResult<DateLessLink> = async (data) => {
  const createdLink = await createNewLink(data);

  return createdLink;
};

export const updateLink: (
  data: LinkUpdateData
) => PResult<DateLessLink> = async (data) => {
  const updatedLink = await updateLinkById(data);

  return updatedLink;
};

export const deleteLink: (
  data: LinkDeleteData
) => PResult<DateLessLink> = async (data) => {
  const deletedLink = await deleteLinkById(data);

  return deletedLink;
};
