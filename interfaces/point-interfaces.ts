export interface Points  {
    profileId:string,
    firstname: string,
    lastname: string,
    point: number,
    state: boolean,
    email: string,
    phone: string,
    created_at: string
  }


  export interface PointForm {
    idPointDollar: string;
    points: string;
    dollar: string;
  }