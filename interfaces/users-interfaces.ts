export interface User {
  profileId: string;
  firstname: string;
  lastname: string;
  address: string;
  photo: string;
  state: Property;
  user_id: string;
  email: string;
  phone: string;
  birthdate: string;
  discount: string;
  location: Property;
  NroContract: string;
  DateSold: string;
  Expiration: string;
  SecondaryEmail: string;
  StatusWallet: string;
  Note: string;
  created_at: string;
  stateId: string;
  packageId: string;
  languageId: string;
  roleId: string;
  SendEmail: number;
  package: Property;
  language: Property;
  role: Property;
}

interface Property {
  name: string;
}

export interface Profile {
  profileId: string;
  firstname: string;
  lastname: string;
  address: string;
  photo: string;
  userId: string;
  email: string;
  phone: string;
  created_at: string;
  stateId: string;
  coOwnerTelephone: string;
  packageId: string;
  languageId: string;
  birthdate: string;
  roleId: string;
  discount: string;
  IdCity: string;
  IdCountry: string;
  NroContract: string;
  DateSold: string;
  Expiration: string;
  SecondaryEmail: string;
  StatusWallet: string;
  Note: string;
}
