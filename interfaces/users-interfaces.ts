export interface User {
  profileId: string;
  firstname: string;
  lastname: string;
  address: string;
  photo: string;
  state: Property;
  userId: string;
  email: string;
  phone: string;
  created_at: string;
  stateId: string;
  packageId: string;
  languageId: string;
  roleId:string;
  package: Property;
  language: Property;
  role: Property;
}

interface Property{
    name: string;
}
