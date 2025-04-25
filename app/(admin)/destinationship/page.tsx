import { ListDestinationShip } from "@/actions/destinationship";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { DestinationShipForm } from "@/components/form/DestinationShipForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableDestinationShip } from "@/components/ui/table/TableDestinationShip";

export default async function DestinationShipPage() {
  // const destination = await ListDestinationShip();
  const [destination, permission] = await Promise.all([
    ListDestinationShip(),
    GetPermissionBySession("DestinosYates"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Destinos</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nuevo Origen/Destino de Yates">
              <DestinationShipForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableDestinationShip
              items={destination}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
