import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { authProfileNickUpdate } from '../api/authFetcher';
import useSetAlert from './useSetAlert';
import { authState } from '../atom/auth';
import { ErrorType } from '../types/error';

export default function useEditNickname() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const setAuthState = useSetRecoilState(authState);

  const mutation = useMutation(authProfileNickUpdate, {
    onSuccess: (data) => {
      console.log('성공', data);
      setAuthState((prev) => {
        return {
          ...prev!,
          nickname: data?.result.nickname,
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
