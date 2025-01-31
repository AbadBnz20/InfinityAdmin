import { ListCategory } from "@/actions/destinations.action";
import { CategoryForm } from "@/components/form/CategoryForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableCategory } from "@/components/ui/table/TableCategory";

export default async function DestinationsPage() {
    const category = await ListCategory();

  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Categorias</h3>
      <div className="my-3">
        <ModalMain active title="Registrar Nueva Categoria">
          <CategoryForm />
        </ModalMain>
      </div>
      <TableCategory items={category} update deletecell />
    </div>
  );
}
