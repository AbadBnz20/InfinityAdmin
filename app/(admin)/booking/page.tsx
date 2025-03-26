import { GetBooking } from "@/actions/booking.action";
import { TableBooking } from "@/components/ui/table/TableBooking";

export default async function BookingPage() {
   const item = await GetBooking();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Vehiculos</h3>
      <TableBooking items={item} />
    </div>
  );
}