import { ListCars } from "@/actions/car.actions";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { CarForm } from "@/components/form/CarForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableCar } from "@/components/ui/table/TableCar";

export default async function CardsPage() {
  const [card, permission] = await Promise.all([
    ListCars(),
    GetPermissionBySession("Vehiculos"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Vehiculos</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain
              active={permission.write}
              title="Registrar Nuevo Vehiculo"
            >
              <CarForm />
            </ModalMain>
          </div>
          {permission.read && <TableCar items={card} update={permission.update} deletecell={permission.delete} />}
        </>
      )}
    </div>
  );
}
