import { ListPackages } from "@/actions/package.action";
import { PackageForm } from "@/components/form/PackageForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TablePackage } from "@/components/ui/table/TablePackage";

export default async function PackagesPage() {
  const packages = await ListPackages();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Paquetes</h3>
      <div className="my-3">
        <ModalMain title="Registrar Nuevo Paquete">
          <PackageForm />
        </ModalMain>
      </div>
      <TablePackage items={packages} />
    </div>
  );
}