import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { authProfileNickUpdate } from '../api/authFetcher';
import useSetAlert from './useSetAlert';
import { authState } from '../atom/auth';

export default function useEditNickname() {
  const { setAlertSuccess, setAlertError } = useSetAlert();
  const setAuthState = useSetRecoilState(authState);

  const mutation = useMutation(authProfileNickUpdate, {
    onSuccess: (data) => {
      setAuthState((prev) => {
        return {
          ...prev!,
          nickname: 'hello',
          //   nickname: data?.result.nickname,
        };
      });
      setAlertSuccess({ success: data?.message });
    },
    onError: (error: any) => {
      setAlertError({ error: error.response.data.message });
      console.log(error);
    },
  });

  return mutation;
}
