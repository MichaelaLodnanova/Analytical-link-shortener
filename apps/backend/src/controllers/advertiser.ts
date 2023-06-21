import { Result } from '@badrap/result';
import { DateLessAdvertisement, PResult } from 'common';

/**
 * Assign random advertisement
 */
export const pickAdvertisement: () => PResult<DateLessAdvertisement> =
  async () => {
    // come up with some logic how an ad should be picked

    const advertisement = await getAdvertisementById();

    return Result.ok(advertisement);
  };
