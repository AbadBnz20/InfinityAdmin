import { ListLanguages } from "@/actions/languages.actions";
import { LanguajesForm } from "@/components/form/LanguajesForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableLanguages } from "@/components/ui/table/TableLanguages";

export default async function LanguagesPage() {
  const languages = await ListLanguages();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Estados</h3>
      <div className="my-3">
        <ModalMain title="Registrar Nuevo Lenguaje">
          <LanguajesForm />
        </ModalMain>
      </div>
      <TableLanguages items={languages} />
    </div>
  );
}
