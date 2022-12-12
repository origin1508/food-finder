import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const categoryValue = atom({
  key: 'categroy',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const methodValue = atom({
  key: 'method',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
