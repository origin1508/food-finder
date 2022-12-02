import customAxios from '../util/customAxios';
import Storage from '../storage/storage';
import CookieStorage from '../storage/cookie';
import { AuthFormInitial } from '../types/auth';

export async function authRegisterRequest(registerForm: AuthFormInitial) {
  const res = await customAxios.post('/api/auth/register', registerForm, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { message } = res.data;
  return message;
}

export async function authLoginRequest(loginForm: AuthFormInitial) {
  const res = await customAxios.post('/api/auth/login', loginForm, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { result } = res.data;
  Storage.setToken(result.accessToken);
  CookieStorage.setToken(result.refreshToken);
  return result;
}
