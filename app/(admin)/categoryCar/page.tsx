import { ListCategoryCars } from "@/actions/categorycars";
import { GetPermissionBySession } from "@/actions/permissions.action";
import { CategoryCarForm } from "@/components/form/CategoryCarForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableCategoryCar } from "@/components/ui/table/TableCategoryCar";

export default async function CarCategoryPage() {
  const [categoryCars, permission] = await Promise.all([
      ListCategoryCars(),
      GetPermissionBySession("Lenguajes"),
    ]);
  
    return (
      <div className="container">
        <h3 className="text-xl font-semibold">Categoria de autos</h3>
        {permission && (
          <>
            <div className="my-3">
              <ModalMain
                active={permission.write}
                title="Registrar Nuevo Lenguaje"
              >
                <CategoryCarForm />
              </ModalMain>
            </div>
            {permission.read && (
              <TableCategoryCar
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