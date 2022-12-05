import { useMutation } from 'react-query';
import { authProfileImageUpdate } from '../api/authFetcher';
import { authState } from '../atom/auth';
import { useSetRecoilState } from 'recoil';
import useSetAlert from './useSetAlert';
import { ErrorType } from '../types/error';

export default function useEditImg() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const setAuthState = useSetRecoilState(authState);

  const mutation = useMutation(authProfileImageUpdate, {
    onSuccess: (data) => {
      console.log('성공', data);
      setAuthState((prev) => {
        return {
          ...prev!,
          profileUrl: data?.result.profileUrl,
        };
      });
      setAlertSuccess({ success: data?.message });
    },
    onError: (error: ErrorType) => {
      const errorMessage = error.response.data.message;
      setAlertError({ error: errorMessage });
    },
  });

  return mutation;
}
