import { ListRoles } from "@/actions/roles.action";
import { RolesForm } from "@/components/form/RolesForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableRoles } from "@/components/ui/table/TableRoles";

export default async function RolesPage() {
  const roles = await ListRoles();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Estados</h3>
      <div className="my-3">
        <ModalMain title="Registrar Nuevo Rol">
          <RolesForm />
        </ModalMain>
      </div>
      <TableRoles items={roles} />
    </div>
  );
}
