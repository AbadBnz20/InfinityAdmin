import { ListSeadustRequest } from "@/actions/reservation.action";
import { TableReservationSeadust } from "@/components/ui/table/TableReservationSeadust";

export default async function ReservationPage() {
  const reservation = await ListSeadustRequest();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Peticiones Yates</h3>
      <>
        <TableReservationSeadust items={reservation} />
      </>
    </div>
  );
}
