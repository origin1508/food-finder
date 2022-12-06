import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { authPasswordUpdate } from '../../api/authFetcher';
import useSetAlert from '../useSetAlert';
import { PATH } from '../../customRouter';
import { ErrorType } from '../../types/error';

export default function useEditPassword() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const navigate = useNavigate();

  const mutation = useMutation(authPasswordUpdate, {
    onSuccess: (data) => {
      setAlertSuccess({ success: data?.message });
      navigate(PATH.LOGIN);
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
