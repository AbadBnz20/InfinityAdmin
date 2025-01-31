import { ListDestinationShip } from "@/actions/destinationship";
import { DestinationShipForm } from "@/components/form/DestinationShipForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableDestinationShip } from "@/components/ui/table/TableDestinationShip";

export default async function DestinationShipPage() {
  const destination = await ListDestinationShip();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Destinos</h3>
      <div className="my-3">
        <ModalMain active title="Registrar Nuevo Origen/Destino de Yates">
          <DestinationShipForm />
        </ModalMain>
      </div>
      <TableDestinationShip items={destination} update deletecell />
    </div>
  );
}
