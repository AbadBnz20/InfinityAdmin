export interface City {
  cityId: string;
  name: string;
  status: boolean;
  state: State;
  stateId: string;
}

interface State {
  name: string;
}
