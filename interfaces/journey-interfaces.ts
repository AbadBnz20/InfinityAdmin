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
  budget: number;
  passengers: number;
  adult: number;
  children: number;
}
