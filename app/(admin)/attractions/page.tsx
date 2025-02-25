import { ListAttractions } from "@/actions/attractions";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { AttractionsForm } from "@/components/form/AttractionsForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableAttractions } from "@/components/ui/table/TableAttractions";

export default async function AttractionsPage() {
  const [categoryCars, permission] = await Promise.all([
    ListAttractions(),
    GetPermissionBySession("Lenguajes"),
  ]);

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Atracciones</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain
              active={permission.write}
              title="Registrar Nuevo Lenguaje"
            >
              <AttractionsForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableAttractions
              items={categoryCars}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
