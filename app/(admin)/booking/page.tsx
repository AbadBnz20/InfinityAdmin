import { GetBooking } from "@/actions/booking.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { TableBooking } from "@/components/ui/table/TableBooking";

export default async function BookingPage() {
  const [item, permission] = await Promise.all([
    GetBooking(),
    GetPermissionBySession("Reservas"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Reservas</h3>

      {permission && <>{permission.read && <TableBooking items={item} />}</>}
    </div>
  );
}
