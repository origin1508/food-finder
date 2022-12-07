import customAxios from '../util/customAxios';
import Storage from '../storage/storage';
import { Restaurant } from '../types/restaurant/restaurantType';

const JWT_TOKEN = Storage.getToken();

export const restaurantLikeRequest = async (restaurant: Restaurant) => {
  const res = await customAxios.post('/restaurant/like', restaurant, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  console.log(res);

  return res.data;
};
