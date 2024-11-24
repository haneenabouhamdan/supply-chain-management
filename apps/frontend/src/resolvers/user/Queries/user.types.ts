export interface UpdateUserInput {
  id: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string | null;
  profilePicture?: string | null;
}

export interface User {
  id: string;
  createdAt: string;
  deletedAt?: string;
  username: string;
  email: string;
  phoneNumber: string;
  status?: string;
  dateOfBirth: string;
  profilePicture?: string;
}
