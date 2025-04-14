import { ListYachtsRequest } from "@/actions/yachtsrequest";
import { TableYachtsRequest } from "@/components/ui/table/TableYachtsRequest";

export default async function YachtRequestPage() {
  const request = await ListYachtsRequest();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Peticiones Yates</h3>
      <>
        <TableYachtsRequest items={request} update deletecell />
      </>
    </div>
  );
}
