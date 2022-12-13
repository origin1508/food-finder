import { atom } from 'recoil';

export const likedRestaurantIdState = atom<number[]>({
  key: 'likedRestaurantId',
  default: [],
});
