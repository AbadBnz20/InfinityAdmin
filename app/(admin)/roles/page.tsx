import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListRoles } from "@/actions/roles.action";
import { RolesForm } from "@/components/form/RolesForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableRoles } from "@/components/ui/table/TableRoles";

export default async function RolesPage() {
  const [roles, permission] = await Promise.all([
    ListRoles(),
    GetPermissionBySession("Roles"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Roles</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active={permission.write} title="Registrar Nuevo Rol">
              <RolesForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableRoles
              items={roles}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
