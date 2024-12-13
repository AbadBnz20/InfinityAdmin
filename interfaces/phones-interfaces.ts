export interface Phone {
  phoneId: string;
  type: string;
  code: string;
  number:number;
  note: string;
  state: boolean;
  profileId: string;
  profile: Profile
}


interface Profile{
    photo: string;
    lastname: string;
    firstname: string;
  }