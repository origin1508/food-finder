import axios from 'axios';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../atom/auth';
import Storage from '../storage/storage';
import CookieStorage from '../storage/cookie';
import useSetAlert from '../hooks/useSetAlert';
import { useEffect } from 'react';

const { VITE_SERVER_URL } = import.meta.env;

const customAxios = axios.create({
  baseURL: VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

customAxios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    throw new Error('Requset Error');
  },
);

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response.status >= 400 && error.response.status < 500) {
      const { statusText, data } = error.response;
      const { message } = data;
      if (statusText === 'Unauthorized') {
        if (
          message ===
          '유효기간이 만료된 리프레시 토큰입니다. 유저를 로그인 화면으로 보내주세요'
        ) {
          Storage.clearToken();
          CookieStorage.clearToken();
          window.location.replace('/login');
        }
        (async () => {
          const res = await customAxios.put(
            'auth/validation/refresh-token',
            { userId: 6 },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CookieStorage.getToken()}`,
              },
            },
          );
          const { result } = res.data;
          console.log('재발급성공', result);

          Storage.setToken(result.accessToken);
          if (CookieStorage.getToken() !== null) {
            CookieStorage.setToken(result.refreshToken);
          }
        })();
      }

      return Promise.reject(error);
    } else if (error.response.status >= 500) {
      return AxiosError;
    }
  },
);

// export const useAxiosInterceptor = () => {
//   // requestHandler는 위와 같은 로직이기에 생략.

//   const { setAlertError } = useSetAlert();
//   const user = useRecoilValue(authState);
//   const { userId } = user ? user : { userId: 2 };

//   const responseInterceptor = customAxios.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     (error) => {
//       if (error.response.status >= 400 && error.response.status < 500) {
//         const { statusText, data } = error.response;
//         const { message } = data;
//         if (statusText === 'Unauthorized') {
//           if (
//             message ===
//             '유효기간이 만료된 리프레시 토큰입니다. 유저를 로그인 화면으로 보내주세요'
//           ) {
//             Storage.clearToken();
//             window.location.replace('/login');
//             setAlertError({ error: '다시 로그인해주세요.' });
//           }
//           (async () => {
//             const res = await customAxios.put(
//               'auth/validation/refresh-token',
//               { userId },
//               {
//                 headers: {
//                   'Content-Type': 'application/json',
//                   Authorization: `Bearer ${CookieStorage.getToken()}`,
//                 },
//               },
//             );
//             const { result } = res.data;
//             console.log('재발급성공', result);
//             console.log('변경 전 ', CookieStorage.getToken());
//             Storage.setToken(result.accessToken);
//             if (CookieStorage.getToken() !== null) {
//               CookieStorage.setToken(result.refreshToken);
//               console.log('변경 후 ', CookieStorage.getToken());
//             }
//           })();
//         }

//         return Promise.reject(error);
//       } else if (error.response.status >= 500) {
//         return AxiosError;
//       }
//     },
//   );

//   const requestInterceptor = customAxios.interceptors.request.use(
//     (req) => {
//       return req;
//     },
//     (error) => {
//       throw new Error('Requset Error');
//     },
//   );

//   useEffect(() => {
//     return () => {
//       customAxios.interceptors.request.eject(requestInterceptor);
//       customAxios.interceptors.response.eject(responseInterceptor);
//     };
//   }, [responseInterceptor, requestInterceptor]);
// };

export default customAxios;
