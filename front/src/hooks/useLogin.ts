import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { authLoginRequest } from '../api/authFetcher';
import { PATH } from '../customRouter';
import useSetAlert from './useSetAlert';
import { authState } from '../atom/auth';
import { ErrorType } from '../types/error';

export default function useLogin() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const setAuthState = useSetRecoilState(authState);
  const navigate = useNavigate();

  const mutation = useMutation(authLoginRequest, {
    onSuccess: (data) => {
      setAuthState(data?.result);
      setAlertSuccess({ success: data?.message });
      navigate(PATH.MAIN);
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
