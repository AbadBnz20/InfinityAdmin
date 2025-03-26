import { ListPositions } from "@/actions/position.action";
import { PositionForm } from "@/components/form/PositionForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TablePosition } from "@/components/ui/table/TablePosition";
export default async function PositionPage() {
  const position = await ListPositions();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Puestos</h3>
      <>
        <div className="my-3">
          <ModalMain active title="Registrar Nuevo Puesto">
            <PositionForm />
          </ModalMain>
        </div>
        <TablePosition items={position} update deletecell />
      </>
    </div>
  );
}
