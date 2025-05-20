import { GetStateActive } from "@/actions/user.action";
import { ListUsercity } from "@/actions/usercity.action";
import { UserCityForm } from "@/components/form/UserCityForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableUserCity } from "@/components/ui/table/TableUserCity";

export default async function UserCityPage() {
  const [usercity, states] = await Promise.all([
    ListUsercity(),
    GetStateActive(),
  ]);
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Ciudad (Usuarios)</h3>
      <>
        <div className="my-3">
          <ModalMain active title="Registrar Nuevo Ciudad">
            <UserCityForm state={states} />
          </ModalMain>
        </div>
        <TableUserCity items={usercity} update deletecell />
      </>
    </div>
  );
}
