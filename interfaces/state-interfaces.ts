export interface State {
  stateId: string;
  name: string;
  state: boolean;
  countryId:string;
  country: Country;
}

interface Country{
    name: string;
}