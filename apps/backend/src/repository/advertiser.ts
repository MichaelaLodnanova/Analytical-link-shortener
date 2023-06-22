import { DateLessAdvertisement, PResult } from 'common';
import { client } from 'model';
import { Result } from '@badrap/result';

/**
 * Assign random advertisement
 */
export const pickAdvertisement: () => PResult<DateLessAdvertisement> =
  async () => {
    // come up with some logic how an ad should be picked
    try {
      const advertisements = await client.advertisement.findMany({
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          adUrl: true,
          forwardUrl: true,
          createdById: true,
        },
      });

      const randomPosition = Math.floor(Math.random() * advertisements.length);
      const advertisement = advertisements.at(randomPosition);

      if (advertisement) {
        return Result.ok(advertisement);
      }

      return Result.err(new Error('No ads to provide'));
    } catch (error) {
      console.error(error);
      return Result.err(error as Error);
    }
  };
