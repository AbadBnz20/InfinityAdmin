import { ListRoom } from "@/actions/room.action";
import { RoomForm } from "@/components/form/RoomForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableRooms } from "@/components/ui/table/TableRooms";

export default async function RoomsPage() {
  const room = await ListRoom();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Habitaciones </h3>
      <>
        <div className="my-3">
          <ModalMain active title="Registrar Nuevo Habitacion">
            <RoomForm />
          </ModalMain>
        </div>
        <TableRooms items={room} update deletecell />
      </>
    </div>
  );
}
