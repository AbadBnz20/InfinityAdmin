export interface packageyachts {
    yachtPackageId: string,
    image:string,
    time: string,
    passengers: string,
    price: number,
    points: number,
    state: boolean,
    ubicationId: string,
    name: string,
    cabin:string,
     name_en:string,
    cabin_en:string,
    origin_destination_ship: location
  }

interface location  { name: string }