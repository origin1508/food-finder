import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authRegisterRequest } from '../api/authFetcher';
import { PATH } from '../customRouter';
import useSetAlert from './useSetAlert';
import { ErrorType } from '../types/error';

export default function useSignup() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const navigate = useNavigate();

  const mutation = useMutation(authRegisterRequest, {
    onSuccess: (message) => {
      navigate(PATH.LOGIN);
      setAlertSuccess({ success: message });
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
