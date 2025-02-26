import { GetPermissionBySession } from "@/actions/permissions.action";
import { ListYachtEngine } from "@/actions/yachtengine";
import { YachtEngineForm } from "@/components/form/YachtEngineForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableYachtEngine } from "@/components/ui/table/TableYachtEngine";

export default async function YachtEnginePage() {
  const [yachtEngine, permission] = await Promise.all([
        ListYachtEngine(),
        GetPermissionBySession("MotorYates"),
      ]);
      return (
        <div className="container">
          <h3 className="text-xl font-semibold">Motor de yates</h3>
          {permission && (
            <>
              <div className="my-3">
                <ModalMain
                  active={permission.write}
                  title="Registrar Nuevo Lenguaje"
                >
                  <YachtEngineForm />
                </ModalMain>
              </div>
              {permission.read && (
                <TableYachtEngine
                  items={yachtEngine}
                  update={permission.update}
                  deletecell={permission.delete}
                />
              )}
            </>
          )}
        </div>
      );
}