import { ListCity } from "@/actions/ctity.action";
import { CityForm } from "@/components/form/CityForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableCity } from "@/components/ui/table/TableCity";

export default async function CityPage() {
  const city = await ListCity();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Ciudad</h3>
      <>
        <div className="my-3">
          <ModalMain active title="Registrar Nueva Ciudad">
           <CityForm/>
          </ModalMain>
        </div>
        <TableCity items={city} update deletecell />
      </>
    </div>
  );
}
