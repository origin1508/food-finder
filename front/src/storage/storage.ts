const SAN3HONG3_AUTH__TOKEN = 'SAN3HONG3_AUTH_TOKEN';
const SAN3HONG3_REFRESH__TOKEN = 'SAN3HONG3_REFRESH_TOKEN';
const SAN3HONG3_USER__ID = 'SAN3HONG3_USER_ID';

const Storage = {
  setToken: (accessToken: string) => {
    sessionStorage.setItem(SAN3HONG3_AUTH__TOKEN, accessToken);
  },
  setRefreshToken: (refreshToken: string) => {
    sessionStorage.setItem(SAN3HONG3_REFRESH__TOKEN, refreshToken);
  },

  setUserId: (userId: string) => {
    sessionStorage.setItem(SAN3HONG3_USER__ID, userId);
  },

  getToken: () => {
    return sessionStorage.getItem(SAN3HONG3_AUTH__TOKEN);
  },
  getRefreshToken: () => {
    return sessionStorage.getItem(SAN3HONG3_REFRESH__TOKEN);
  },

  getUserId: () => {
    return sessionStorage.getItem(SAN3HONG3_USER__ID);
  },

  clearToken: () => {
    return sessionStorage.clear();
  },
};

export default Storage;
