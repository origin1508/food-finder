const SAN3HONG3_AUTH__TOKEN = 'SAN3HONG3_AUTH_TOKEN';
const SAN3HONG3_USER__ID = 'SAN3HONG3_USER_ID';

const Storage = {
  setToken: (accessToken: string) => {
    sessionStorage.setItem(SAN3HONG3_AUTH__TOKEN, accessToken);
  },

  setUserId: (userId: string) => {
    sessionStorage.setItem(SAN3HONG3_USER__ID, userId);
  },

  getToken: () => {
    return sessionStorage.getItem(SAN3HONG3_AUTH__TOKEN);
  },

  getUserId: () => {
    return sessionStorage.getItem(SAN3HONG3_USER__ID);
  },

  clearToken: () => {
    return sessionStorage.clear();
  },
};

export default Storage;
