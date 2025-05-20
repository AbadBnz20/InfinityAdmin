import { GetCountryActive } from "@/actions/countries.action";
import { GetCityActive } from "@/actions/destinationship";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { GetLanguagesActive, GetPackageActive, GetStateActive, ListUsers } from "@/actions/user.action";
import { UserForm } from "@/components/form/UserForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableUser } from "@/components/ui/table/TableUser";

export default async function PartherPage() {
   const [users, permission,countries,states,cities,packages,languages] = await Promise.all([
      ListUsers(),
      GetPermissionBySession("Socios"),
      GetCountryActive(),
      GetStateActive(),
      GetCityActive(),
      GetPackageActive(),
      GetLanguagesActive()
    ]);
    return (
      <div className="container">
        <h3 className="text-xl font-semibold">Socios</h3>
        {permission && (
          <>
            <div className="my-3">
              <ModalMain
                active={permission.write}
                title="Registrar Nuevo Socio"
                size="3xl"
              >
                <UserForm  countries={countries} states={states} cities={cities} packages={packages} languages={languages}  />
              </ModalMain>
            </div>
            {permission.read && <TableUser items={users} update={permission.update} deleteRom={permission.delete} />}
          </>
        )}
      </div>
    );
}