import { PResult } from 'common';
import { getAdvertisementById } from '../repository/advertisementRepository';
import { Advertisement } from 'model';

/**
 * Assign random advertisement
 */
export const pickAdvertisement: () => PResult<Advertisement> = async () => {
  // come up with some logic how an ad should be picked

  const advertisement = await getAdvertisementById({ id: '' });

  return advertisement;
};
