export interface IUser {
  name: string;
  email: String;
  password: string;
  isAdmin?: boolean;
  phone: string;
  accessToken: string;
  refreshToken: string;
}
