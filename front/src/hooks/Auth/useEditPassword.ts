import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { authPasswordUpdate } from '../../api/authFetcher';
import useSetAlert from '../useSetAlert';
import Storage from '../../storage/storage';
import { ErrorType } from '../../types/error';

export default function useEditPassword() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const navigate = useNavigate();

  const mutation = useMutation(authPasswordUpdate, {
    onSuccess: (data) => {
      setAlertSuccess({ success: data?.message });
      Storage.clearToken();
      window.location.replace('/login');
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
