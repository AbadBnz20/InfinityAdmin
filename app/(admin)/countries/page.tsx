import { ListCountries } from "@/actions/countries.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { CountriesForm } from "@/components/form/CountriesForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableC } from "@/components/ui/table/TableC";

export default async function CountriesPage() {
  const [countries, permission] = await Promise.all([
    ListCountries(),
    GetPermissionBySession("Paises"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Paises</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active={permission.write} title="Registrar Nuevo Pais">
              <CountriesForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableC
              items={countries}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
