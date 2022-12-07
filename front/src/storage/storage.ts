const SAN3HONG3_AUTH__TOKEN = 'SAN3HONG3_AUTH_TOKEN';

const Storage = {
  setToken: (accessToken: string) => {
    sessionStorage.setItem(SAN3HONG3_AUTH__TOKEN, accessToken);
  },

  getToken: () => {
    return sessionStorage.getItem(SAN3HONG3_AUTH__TOKEN);
  },

  clearToken: () => {
    return sessionStorage.clear();
  },
};

export default Storage;
