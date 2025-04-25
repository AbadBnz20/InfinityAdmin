import { ListDestinations } from "@/actions/destinations.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { DestinationForm } from "@/components/form/DestinationForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableDestinations } from "@/components/ui/table/TableDestinations";

export default async function DestinationsPage() {
  const [destination, permission] = await Promise.all([
    ListDestinations(),
    GetPermissionBySession("Destinos"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Destinos</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nuevo Origen/Destino">
              <DestinationForm />
            </ModalMain>
          </div>
          <TableDestinations items={destination} update={permission.update} deletecell={permission.delete} />
        </>
      )}
    </div>
  );
}
