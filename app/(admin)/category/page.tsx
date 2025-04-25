import { ListCategory } from "@/actions/destinations.action";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { CategoryForm } from "@/components/form/CategoryForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableCategory } from "@/components/ui/table/TableCategory";

export default async function DestinationsPage() {
  const [category, permission] = await Promise.all([
    ListCategory(),
    GetPermissionBySession("Categorias"),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Categorias</h3>
      {permission && (
        <>
          <div className="my-3">
            <ModalMain active title="Registrar Nueva Categoria">
              <CategoryForm />
            </ModalMain>
          </div>
          {permission.read && (
            <TableCategory items={category} update={permission.update} deletecell={permission.delete} />
          )}
        </>
      )}
    </div>
  );
}
