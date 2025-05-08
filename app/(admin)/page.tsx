import { GetChartsPoshog } from "@/actions/charts.action";
import { ContentChats } from "@/components/home/ContentChats";

export default async function Home() {
  const data = await GetChartsPoshog();

  if (!data) {
    return <h1>Error al cargar los datos</h1>;
  }

  return (
    <>
      <ContentChats data={data} />
    </>
  );
}
