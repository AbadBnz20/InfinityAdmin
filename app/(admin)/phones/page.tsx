import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListPhone } from "@/actions/phone.action";
import { TablePhones } from "@/components/ui/table/TablePhones";

export default async function PhonesPage() {
  const [phones, permission] = await Promise.all([
    ListPhone(),
    GetPermissionBySession("Celulares"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Celulares</h3>
      {permission && (
        <>
          <div className="my-3"></div>
          {permission.read && <TablePhones items={phones} />}
        </>
      )}
    </div>
  );
}
