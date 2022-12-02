export interface AuthFormInitial {
  email: string;
  nickname?: string;
  password: string;
  confirmPassword?: string;
}

export interface EditImageForm {
  endPoint: string;
  formData: FormData;
}
