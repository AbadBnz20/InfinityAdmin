import { ListAdmin } from "@/actions/admin.action";
import { GetCountryActive } from "@/actions/countries.action";
import { GetCityActive } from "@/actions/destinationship";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { GetStateActive } from "@/actions/user.action";
import { AdminForm } from "@/components/form/AdminForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableAdmin } from "@/components/ui/table/TableAdmin";

export default async function UsersPage() {
  const [users, permission,countries,states,cities] = await Promise.all([
    ListAdmin(),
    GetPermissionBySession("Usuarios"),
    GetCountryActive(),
    GetStateActive(),
    GetCityActive(),
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
              <AdminForm countries={countries} states={states} cities={cities} />
            </ModalMain>
          </div>

          {permission.read && (
            <TableAdmin items={users} update deleteRom={permission.delete} />
          )}
        </>
      )}
    </div>
  );
}
