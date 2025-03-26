import { ListLocations } from "@/actions/location.action";
import { LocationForm } from "@/components/form/LocationForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableLocation } from "@/components/ui/table/TableLocation";

export default async function LocationPage() {
  const location = await ListLocations();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Ubicación</h3>
      <>
        <div className="my-3">
          <ModalMain active title="Registrar Nuevo Ubicacion">
            <LocationForm />
          </ModalMain>
        </div>

        <TableLocation items={location} update deletecell />
      </>
    </div>
  );
}
