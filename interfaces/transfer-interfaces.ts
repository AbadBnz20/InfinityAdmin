export interface Transfer {
  transferId: string;
  type: string;
  arrival_date: string;
  arrival_time: string;
  return_date: string;
  return_time: string;
  passengers: {
    aduts: number;
    children: number;
  };
  transfer_code: string | null;
  description: string;
  total: number | null;
  transport_arrival_Id: string;
  transport_return_Id: string | null;
  originId: string;
  destinationId: string;
  createDate: string;
  email: string;
  name: string;
  phone: string;
  arrival_car: {
    model: string;
  };
  return_car: {
    model: string;
  } | null;
    origin: {
        name: string;
    };
    destination: {
        name: string;
    };
}
