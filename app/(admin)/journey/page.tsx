import { ListJourney } from "@/actions/journey.action";
import { TableJourney } from "@/components/ui/table/TableJourney";

export default async function JourneyPage() {
  const journey = await ListJourney();

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Viajes</h3>
      <div className="mt-2">
        <TableJourney items={journey} update deletecell />
      </div>
    </div>
  );
}
