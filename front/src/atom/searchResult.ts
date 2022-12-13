import { atom } from 'recoil';

interface SearchResultValue {
  dish_id: number;
  name: string;
  views: number;
  image_url1: string;
  image_url2: string;
  likes: number;
  nickname: string;
}

export const searchResultState = atom<SearchResultValue[]>({
  key: 'searchResult',
  default: [],
});
