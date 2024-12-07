import { ListCountries } from "@/actions/countries.action";
import { CountriesForm } from "@/components/form/CountriesForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableC } from "@/components/ui/table/TableC";

export default async function CountriesPage() {
  const countries = await ListCountries();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Paises</h3>
      <div className="my-3">
        <ModalMain title="Registrar Nuevo Pais">
          <CountriesForm />
        </ModalMain>
      </div>
      <TableC items={countries} />
    </div>
  );
}
