import { ListCars } from "@/actions/car.actions";
import { CarForm } from "@/components/form/CarForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableCar } from "@/components/ui/table/TableCar";



export default async function CardsPage() {
  const card = await  ListCars();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Vehiculos</h3>
      <div className="my-3">
        <ModalMain title="Registrar Nuevo Vehiculo">
          <CarForm />
        </ModalMain>
      </div>
      <TableCar items={card} />
    </div>
  );
}
