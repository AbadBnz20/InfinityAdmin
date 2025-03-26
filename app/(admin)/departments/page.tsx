import { ListDepartaments } from "@/actions/departaments.action";
import { DepartmentFrom } from "@/components/form/DepartmentFrom";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableDepartment } from "@/components/ui/table/TableDepartment";

export default async function DepartamentsPage() {
  const department = await ListDepartaments();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Departamentos</h3>
      <>
        <div className="my-3">
          <ModalMain active title="Registrar Nuevo Departamento">
            <DepartmentFrom />
          </ModalMain>
        </div>
        <TableDepartment items={department} update deletecell />
      </>
    </div>
  );
}
