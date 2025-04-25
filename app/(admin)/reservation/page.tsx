import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListSeadustRequest } from "@/actions/reservation.action";
import { TableReservationSeadust } from "@/components/ui/table/TableReservationSeadust";

export default async function ReservationPage() {
  const [reservation, permission] = await Promise.all([
    ListSeadustRequest(),
    GetPermissionBySession("Reserva Seadust"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Reservas Seadust</h3>
      {permission && (
        <>
          {permission.read && <TableReservationSeadust items={reservation} />}
        </>
      )}

    </div>
  );
}
