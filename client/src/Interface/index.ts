export interface TUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  provider: string;
  address?: string[] | null;
  phoneNumber?: string;
}

export interface TAddressFormValues {
  fullName: string;
  phoneNumber: string;
  landmark?: string;
  division: string;
  city: string;
  policeStation: string;
  address: string;
}
