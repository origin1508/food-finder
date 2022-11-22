import AuthLogin from '../components/auth/AuthLogin';
import BasePageComponent from '../hoc/BasePageComponent';

const Login = () => {
  return (
    <BasePageComponent>
      <AuthLogin />
    </BasePageComponent>
  );
};

export default Login;
