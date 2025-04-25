import { ListDepartaments } from "@/actions/departaments.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { DepartmentFrom } from "@/components/form/DepartmentFrom";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableDepartment } from "@/components/ui/table/TableDepartment";

export default async function DepartamentsPage() {
  // const department = await ListDepartaments();
  const [department, permission] = await Promise.all([
    ListDepartaments(),
    GetPermissionBySession("Departamentos"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Departamentos</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nuevo Departamento">
              <DepartmentFrom />
            </ModalMain>
          </div>
          <TableDepartment items={department} update={permission.update} deletecell={permission.delete} />
        </>
      )}
    </div>
  );
}
