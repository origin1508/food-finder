import customAxios from '../util/customAxios';
import Storage from '../storage/storage';
import { Restaurant } from '../types/restaurant/restaurantType';

const JWT_TOKEN = Storage.getToken();

export const getLikedRestaurant = async () => {
  const res = await customAxios.get(`/user/like/restaurant`, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });
  return res.data;
};

export const restaurantLikeRequest = async (restaurant: Restaurant) => {
  const res = await customAxios.post('/restaurant/like', restaurant, {
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });

  return res.data;
};

export const restaurantUnlikeRequest = async (restaurantId: number) => {
  const res = await customAxios.delete('/restaurant/unlike', {
    data: {
      restaurantId: restaurantId,
    },
    headers: {
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
  });

  return res.data;
};
