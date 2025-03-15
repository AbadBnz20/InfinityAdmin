import { ListPoints } from "@/actions/point.action";
import { TablePoints } from "@/components/ui/table/TablePoints";

export default async function PointsPage() {

  const points = await ListPoints()
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Puntos</h3>
      <TablePoints items={points}/>
    </div>
  );
}
