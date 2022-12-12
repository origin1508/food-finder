import customAxios from '../util/customAxios';
import Storage from '../storage/storage';
import { Restaurant } from '../types/restaurant/restaurantType';

export const getLikedRestaurant = async (userId: number) => {
  const res = await customAxios.get(`/user/${userId}/like/restaurant`, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  return res.data;
};

export const restaurantLikeRequest = async (restaurant: Restaurant) => {
  const res = await customAxios.post('/restaurant/like', restaurant, {
    headers: {
      Authorization: `Bearer ${Storage.getToken()}`,
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
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });

  return res.data;
};
