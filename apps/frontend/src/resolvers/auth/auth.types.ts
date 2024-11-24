export interface AuthUser {
  id: string;
  username: string;
  phoneNumber: string;
  email?: string;
  dateOfBirth: string;
  profilePicture?: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
