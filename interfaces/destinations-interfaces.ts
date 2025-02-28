export interface Category {
  categoryId: string;
  name: string;
  state: boolean;
}

export interface Destination {
  origindestinationId: string;
  name: string;
  description: string | null;
  registration_date: string;
  state: boolean;
  categoryoriginId: string;
  category_origin_destination: Category;
}

export interface DestinationShip {
  origin_destination_ship_id: string;
  name: string;
  description: string | null;
  registration_date: Date;
  state: boolean;
  cityId:string;
  city:City
}

interface City{
  name:string
}

export interface DestinationYach {
  origin_destination_ship_id: string;
  name: string;
  description: string | null;
  registration_date: Date;
  state: boolean;
  cityId:string;

}