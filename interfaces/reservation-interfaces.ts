export interface SeadustRequest {
  IdSeadusRequest: string;
  start_date: string;
  end_date: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: boolean;
  createDate: string;
  IdRoom: string;
  adult: 2;
  children: 1;
  room: {
    name: string;
    typeOfBed: string;
    numberOfBeds: number;
  };
}
