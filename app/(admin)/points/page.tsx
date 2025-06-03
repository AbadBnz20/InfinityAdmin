import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListPoints } from "@/actions/point.action";
import { PointForm } from "@/components/form/PointForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TablePoints } from "@/components/ui/table/TablePoints";

export default async function PointsPage() {
  const [points, permission] = await Promise.all([
    ListPoints(),
    GetPermissionBySession("Puntos"),
  ]);

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Puntos</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active={permission.write} title="Registrar Nuevo Estado" buttontitle="Configurar Puntos">
              <PointForm />
            </ModalMain>
          </div>
          {permission.read && <TablePoints items={points} />}
        </>
      )}
    </div>
  );
}
