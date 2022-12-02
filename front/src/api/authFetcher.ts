import customAxios from '../util/customAxios';
import Storage from '../storage/storage';
import CookieStorage from '../storage/cookie';
import { AuthFormInitial, EditImageForm } from '../types/auth';

export async function authRegisterRequest(registerForm: AuthFormInitial) {
  const res = await customAxios.post('/auth/register', registerForm, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { message } = res.data;
  return message;
}

export async function authLoginRequest(loginForm: AuthFormInitial) {
  const res = await customAxios.post('/auth/login', loginForm, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { result } = res.data;
  Storage.setToken(result.accessToken);
  CookieStorage.setToken(result.refreshToken);
  return res.data;
}

export async function authProfileImageUpdate({
  endPoint,
  formData,
}: EditImageForm) {
  const res = await customAxios.put(endPoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${Storage.getToken()}`,
    },
  });
  const { result } = res.data;
  return result;
}
