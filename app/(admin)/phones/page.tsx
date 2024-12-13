import { ListPhone } from "@/actions/phone.action";
import { TablePhones } from "@/components/ui/table/TablePhones";

export default async function PhonesPage() {
  const phones = await ListPhone();
  return (
    <div className="container">
    <h3 className="text-xl font-semibold">Celulares</h3>
    <div className="my-3">
    </div>
    <TablePhones items={phones} />
  </div>
  );
}