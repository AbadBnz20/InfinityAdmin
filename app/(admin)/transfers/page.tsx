import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListTransferRequest } from "@/actions/transfer.action";
import { TableTransfer } from "@/components/ui/table/TableTransfer";

export default async function TransfersPage() {
  const [transfer, permission] = await Promise.all([
    ListTransferRequest(),
    GetPermissionBySession("Traslados"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Trasportacion</h3>
      {permission && (
        <>{permission.read && <TableTransfer items={transfer} />}</>
      )}
    </div>
  );
}
