import { GetCountryActive } from "@/actions/countries.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListStates } from "@/actions/state.action";
import { StatesForm } from "@/components/form/StatesForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableState } from "@/components/ui/table/TableState";

export default async function StatesPage() {
  const [state, permission,countries] = await Promise.all([
    ListStates(),
    GetPermissionBySession("Estados"),
    GetCountryActive(),
  ]);

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Estados</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active={permission.write} title="Registrar Nuevo Estado">
              <StatesForm countries={countries} />
            </ModalMain>
          </div>
          {permission.read && (
            <TableState
              items={state}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
