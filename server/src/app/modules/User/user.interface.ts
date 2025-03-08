export interface TUserData {
  name: string;
  email: string;
  image: string;
  provider: 'facebook' | 'google';
  status: 'active' | 'blocked';
  phoneNumber?: string;
  address: string[] | null;
}
