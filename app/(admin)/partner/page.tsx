import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListUsers } from "@/actions/user.action";
import { UserForm } from "@/components/form/UserForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableUser } from "@/components/ui/table/TableUser";

export default async function PartherPage() {
   const [users, permission] = await Promise.all([
      ListUsers(),
      GetPermissionBySession("Socios"),
    ]);
    return (
      <div className="container">
        <h3 className="text-xl font-semibold">Socios</h3>
        {permission && (
          <>
            <div className="my-3">
              <ModalMain
                active={permission.write}
                title="Registrar Nuevo Usuario"
                size="3xl"
              >
                <UserForm  />
              </ModalMain>
            </div>
            {permission.read && <TableUser items={users} update />}
          </>
        )}
      </div>
    );
}