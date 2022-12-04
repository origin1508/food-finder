import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { authPasswordUpdate } from '../api/authFetcher';
import useSetAlert from './useSetAlert';
import { PATH } from '../customRouter';

export default function useEditPassword() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const navigate = useNavigate();

  const mutation = useMutation(authPasswordUpdate, {
    onSuccess: (data) => {
      setAlertSuccess({ success: data?.message });
      navigate(PATH.LOGIN);
    },
    onError: (error: any) => {
      setAlertError({ error: error.response.data.message });
      console.log(error);
    },
  });

  return mutation;
}
