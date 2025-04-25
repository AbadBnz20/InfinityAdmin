import { ListCity } from "@/actions/ctity.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { CityForm } from "@/components/form/CityForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableCity } from "@/components/ui/table/TableCity";

export default async function CityPage() {
  // const city = await ListCity();
  const [city, permission] = await Promise.all([
    ListCity(),
    GetPermissionBySession("Ciudades"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Ciudad</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nueva Ciudad">
              <CityForm />
            </ModalMain>
          </div>
          <TableCity items={city} update={permission.update} deletecell={permission.delete} />
        </>
      )}
    </div>
  );
}
