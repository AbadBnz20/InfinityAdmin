import { ListJourney } from "@/actions/journey.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { TableJourney } from "@/components/ui/table/TableJourney";

export default async function JourneyPage() {
  const [journey, permission] = await Promise.all([
    ListJourney(),
    GetPermissionBySession("Viajes"),
  ]);

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Viajes</h3>
      {permission && (
        <>
          {permission.read && (
            <div className="mt-2">
              <TableJourney
                items={journey}
                update={permission.update}
                deletecell={permission.delete}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
