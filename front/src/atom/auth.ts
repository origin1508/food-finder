import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import Storage from '../storage/storage';

const { persistAtom } = recoilPersist();

export interface AuthInfo {
  accessToken: string;
  refreshToken: string;
  userId: number;
  email: string;
  nickname: string;
  profileUrl: string;
}

export const authState = atom<AuthInfo | null>({
  key: 'user',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const isLoginSelector = selector({
  key: 'isLogin',
  get: ({ get }) => {
    const user = get(authState);
    const checkLogin = Storage.getToken() && user?.accessToken ? true : false;
    return checkLogin;
  },
});
