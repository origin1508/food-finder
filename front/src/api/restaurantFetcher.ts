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

  return res.data;
};

export const restaurantUnlikeRequest = async (title: string) => {
  const res = await customAxios.delete('/restaurant/unlike', {
    data: {
      title: title,
    },
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });

  return res.data;
};
