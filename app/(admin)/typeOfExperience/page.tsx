import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListTypeOfExperience } from "@/actions/typeofexperience";
import { TypeOfExperienceForm } from "@/components/form/TypeOfExperienceForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableTypeOfExperience } from "@/components/ui/table/TableTypeOfExperience";

export default async function TypeOfExperiencePage() {
  const [categoryCars, permission] = await Promise.all([
    ListTypeOfExperience(),
    GetPermissionBySession("Lenguajes"),
  ]);

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Tipo de experiencia</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain
              active={permission.write}
              title="Registrar Nuevo Lenguaje"
            >
              <TypeOfExperienceForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableTypeOfExperience
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
