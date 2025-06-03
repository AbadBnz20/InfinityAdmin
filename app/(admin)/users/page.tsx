import { ListAdmin } from "@/actions/admin.action";
import { ListDepartaments } from "@/actions/departaments.action";
import { ListLocations } from "@/actions/location.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListPositions } from "@/actions/position.action";
import { GetRoleActive } from "@/actions/user.action";
import { AdminForm } from "@/components/form/AdminForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableAdmin } from "@/components/ui/table/TableAdmin";

export default async function UsersPage() {
  const [users, permission,locations,positions,departaments,roles] = await Promise.all([
    ListAdmin(),
    GetPermissionBySession("Usuarios"),
    ListLocations(),
    ListPositions(),
    ListDepartaments(),
    GetRoleActive()

  ]);

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Administradores</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain
              active={permission.write}
              title="Registrar Nuevo Usuario"
              size="3xl"
            >
              <AdminForm roles={roles} departaments={departaments} locations={locations} positions={positions}  />
            </ModalMain>
          </div>

          {permission.read && (
            <TableAdmin items={users} update={permission.update} deleteRom={permission.delete} />
          )}
        </>
      )}
    </div>
  );
}
