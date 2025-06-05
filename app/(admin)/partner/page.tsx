import { GetPermissionBySession } from "@/actions/permissions.action";
import { GetLanguagesActive, GetPackageActive } from "@/actions/user.action";
import { UserForm } from "@/components/form/UserForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableUser } from "@/components/ui/table/TableUser";

export default async function PartherPage() {
   const [ permission,packages,languages] = await Promise.all([
      GetPermissionBySession("Socios"),
      GetPackageActive(),
      GetLanguagesActive()
    ]);
    return (
      <div className="container">
        <h3 className="text-xl font-semibold">Socios</h3>
        {permission && (
          <>
            <div className="my-3">
              <ModalMain
                active={permission.write}
                title="Registrar Nuevo Socio"
                size="3xl"
              >
                <UserForm packages={packages} languages={languages}  />
              </ModalMain>
            </div>
            {permission.read && <TableUser update={permission.update} deleteRom={permission.delete} />}
          </>
        )}
      </div>
    );
}