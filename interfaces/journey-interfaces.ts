export interface Journey {
  quotesId: string;
  user: string;
  email: string;
  phone: string;
  country_origin: string;
  city_origin: string;
  contry_destination: string;
  city_destination: string;
  departure_date: string;
  return_date: string;
  createDate: string;
  budget: number;
  details: string;
  passengers: number;
  adult: number;
  childrens: Array<string>;
}
