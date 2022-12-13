import { Alert } from '../atom/alert';
import { AuthInfo } from '../atom/auth';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { AuthFormInitial } from './auth';

export interface UserInfoEdit {
  setIsPasswordEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertLoading: ({ loading }: Alert) => void;
  user: AuthInfo;
  register: UseFormRegister<AuthFormInitial>;
  errors: Partial<FieldErrorsImpl<AuthFormInitial>>;
  onSubmit?: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
}
