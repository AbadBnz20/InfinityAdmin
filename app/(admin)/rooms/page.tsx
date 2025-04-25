import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListRoom } from "@/actions/room.action";
import { RoomForm } from "@/components/form/RoomForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableRooms } from "@/components/ui/table/TableRooms";

export default async function RoomsPage() {
  const [room, permission] = await Promise.all([
    ListRoom(),
    GetPermissionBySession("Habitaciones"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Habitaciones </h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nuevo Habitacion">
              <RoomForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableRooms
              items={room}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
