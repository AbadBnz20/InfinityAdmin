import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListYachtsRequest } from "@/actions/yachtsrequest";
import { TableYachtsRequest } from "@/components/ui/table/TableYachtsRequest";

export default async function YachtRequestPage() {
  const [request, permission] = await Promise.all([
    ListYachtsRequest(),
    GetPermissionBySession("SolicitudYates"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Peticiones Yates</h3>
      
      {permission && (
        <>
          {permission.read && (
            <TableYachtsRequest items={request} update deletecell />
          )}
        </>
      )}
    </div>
  );
}
