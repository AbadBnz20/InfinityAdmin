import { ListUsers } from "@/actions/user.action";
import { UserForm } from "@/components/form/UserForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableUser } from "@/components/ui/table/TableUser";

export default async function UsersPage() {
  const users = await ListUsers();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Usuarios</h3>
      <div className="my-3">
        <ModalMain title="Registrar Nuevo Estado" size="3xl">
          <UserForm />
        </ModalMain>
      </div>
      <TableUser items={users} />
    </div>
  );
}
