export interface YachsRequest {
    yachtRequestId:string,
    date: string,
    time: string,
    passengers: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    state: boolean,
    ubicationId: string,
    typeOfExperienceId: string,
    motorYachtId: string,
    packageYachtId?: string,
    origin_destination_ship: { name: string },
    typeOfExperience: { name: string },
    motorYacht: { name: string }
  }