export interface FormValues {
  email: string;
  password: string;
  rePassword: string;
  name: string;
}

export interface dirtyValues {
  email?: boolean;
  password?: boolean;
  rePassword?: boolean;
  name?: boolean;
}
