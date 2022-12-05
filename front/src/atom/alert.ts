import { atom } from 'recoil';

export interface Alert {
  loading?: boolean;
  success?: null | string | string[];
  error?: null | string | string[];
}

export const alertState = atom<Alert | null>({
  key: 'alert',
  default: {
    loading: false,
    error: null,
    success: null,
  },
});
