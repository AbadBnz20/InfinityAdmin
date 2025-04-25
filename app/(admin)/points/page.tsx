import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListPoints } from "@/actions/point.action";
import { TablePoints } from "@/components/ui/table/TablePoints";

export default async function PointsPage() {
  const [points, permission] = await Promise.all([
    ListPoints(),
    GetPermissionBySession("Puntos"),
  ]);

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Puntos</h3>
      {permission && <>{permission.read && <TablePoints items={points} />}</>}
    </div>
  );
}
