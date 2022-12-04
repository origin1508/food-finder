import { useMutation } from 'react-query';
import { authPasswordUpdate } from '../api/authFetcher';
import useSetAlert from './useSetAlert';

export default function useEditPassword() {
  const { setAlertSuccess, setAlertError } = useSetAlert();

  const mutation = useMutation(authPasswordUpdate, {
    onSuccess: (data) => {
      setAlertSuccess({ success: data?.message });
    },
    onError: (error: any) => {
      setAlertError({ error: error.response.data.message });
      console.log(error);
    },
  });

  return mutation;
}
