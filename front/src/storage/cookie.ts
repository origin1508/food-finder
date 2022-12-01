import Cookie from 'cookie-universal';

const cookie = Cookie();
const SAN3HONG3_AUTH__REFRESHTOKEN = 'SAN3HONG3_AUTH_REFRESH_TOKEN';

const CookieStorage = {
  setToken: (token: string) => {
    cookie.set(SAN3HONG3_AUTH__REFRESHTOKEN, token, {
      sameSite: true,
    });
  },

  getToken: () => {
    return cookie.get(SAN3HONG3_AUTH__REFRESHTOKEN);
  },

  clearToken: () => {
    cookie.remove(SAN3HONG3_AUTH__REFRESHTOKEN);
  },
};

export default CookieStorage;
