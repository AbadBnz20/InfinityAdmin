import { ListPackages } from "@/actions/package.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { PackageForm } from "@/components/form/PackageForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TablePackage } from "@/components/ui/table/TablePackage";

export default async function PackagesPage() {
  const [packages, permission] = await Promise.all([
    ListPackages(),
    GetPermissionBySession("Paquetes"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Paquetes</h3>

      {permission && (
        <>
          <div className="my-3">
            <ModalMain
              active={permission.write}
              title="Registrar Nuevo Paquete"
            >
              <PackageForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TablePackage
              items={packages}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
