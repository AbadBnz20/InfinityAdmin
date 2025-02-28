import { ListPackageYachts } from "@/actions/packageyachts";
import { PackageYachtsForm } from "@/components/form/PackageYachtsForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TablePackageYachts } from "@/components/ui/table/TablePackageYachts";

export default async function PackageYachtsPage() {
  const packageYachts = await ListPackageYachts();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Paquete Yates</h3>
      <>
        <div className="my-3">
          <ModalMain
                active
                title="Registrar Nuevo Paquete"
              >
                <PackageYachtsForm />
              </ModalMain>
        </div>
        <TablePackageYachts items={packageYachts} update deletecell />
      </>
    </div>
  );
}
