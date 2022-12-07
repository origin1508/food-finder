import Loader from './Loader';
import Toast from './Toast';
import useSetAlert from '../../hooks/useSetAlert';
import { theme } from '../../styles/theme';

const Alert = () => {
  const { alert } = useSetAlert();

  return (
    <>
      {alert?.loading && <Loader />}

      {alert?.error && (
        <Toast title="Error" body={alert.error} bgColor={theme.errorColor} />
      )}

      {alert?.success && (
        <Toast
          title="Success"
          body={alert.success}
          bgColor={theme.successColor}
        />
      )}
    </>
  );
};

export default Alert;
