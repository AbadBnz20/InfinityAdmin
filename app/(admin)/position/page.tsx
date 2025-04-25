import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListPositions } from "@/actions/position.action";
import { PositionForm } from "@/components/form/PositionForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TablePosition } from "@/components/ui/table/TablePosition";
export default async function PositionPage() {
  const [position, permission] = await Promise.all([
    ListPositions(),
    GetPermissionBySession("Puestos"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Puestos</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nuevo Puesto">
              <PositionForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TablePosition
              items={position}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
