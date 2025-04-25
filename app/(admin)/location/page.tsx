import { ListLocations } from "@/actions/location.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { LocationForm } from "@/components/form/LocationForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableLocation } from "@/components/ui/table/TableLocation";

export default async function LocationPage() {
  // const location = await ListLocations();

  const [location, permission] = await Promise.all([
    ListLocations(),
    GetPermissionBySession("Ubicaciones"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Locacion</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nuevo Ubicacion">
              <LocationForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableLocation
              items={location}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
