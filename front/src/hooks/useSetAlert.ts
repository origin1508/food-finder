import { useRecoilValue, useSetRecoilState } from 'recoil';
import { alertState } from '../atom/alert';
import { Alert } from '../atom/alert';

const useSetAlert = () => {
  const alert = useRecoilValue(alertState);
  const setAlert = useSetRecoilState(alertState);

  const setAlertLoading = ({ loading }: Alert) => {
    setAlert((prev) => {
      return {
        ...prev,
        loading,
      };
    });
  };
  const setAlertError = ({ error }: Alert) => {
    setAlert((prev) => {
      return {
        ...prev,
        loading: false,
        error: error,
      };
    });
  };
  const setAlertSuccess = ({ success }: Alert) => {
    setAlert((prev) => {
      return {
        ...prev,
        loading: false,
        success: success,
      };
    });
  };
  const closeToast = () => {
    setAlert(() => {
      return {
        loading: false,
        error: null,
        success: null,
      };
    });
  };

  return { alert, setAlertLoading, setAlertError, setAlertSuccess, closeToast };
};
export default useSetAlert;
