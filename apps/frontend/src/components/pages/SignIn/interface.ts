export interface SignUpPayload {
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
  confirmPassword: string;
}

export interface SignInPayload {
  identifier: string;
  password: string;
}
