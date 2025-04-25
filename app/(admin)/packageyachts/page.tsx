import { ListPackageYachts } from "@/actions/packageyachts";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { PackageYachtsForm } from "@/components/form/PackageYachtsForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TablePackageYachts } from "@/components/ui/table/TablePackageYachts";

export default async function PackageYachtsPage() {
  const [packageYachts, permission] = await Promise.all([
    ListPackageYachts(),
    GetPermissionBySession("PaquetesYates"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Paquete Yates</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nuevo Paquete">
              <PackageYachtsForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TablePackageYachts
              items={packageYachts}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
