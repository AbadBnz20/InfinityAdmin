import { ListLanguages } from "@/actions/languages.actions";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { LanguajesForm } from "@/components/form/LanguajesForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableLanguages } from "@/components/ui/table/TableLanguages";

export default async function LanguagesPage() {
  const [languages, permission] = await Promise.all([
    ListLanguages(),
    GetPermissionBySession("Lenguajes"),
  ]);

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Estados</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain
              active={permission.write}
              title="Registrar Nuevo Lenguaje"
            >
              <LanguajesForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableLanguages
              items={languages}
              update={permission.update}
              deletecell={permission.delete}
            />
          )}
        </>
      )}
    </div>
  );
}
