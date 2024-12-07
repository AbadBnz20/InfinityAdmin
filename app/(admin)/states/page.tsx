import { ListStates } from "@/actions/state.action";
import { StatesForm } from "@/components/form/StatesForm";
import { ModalMain } from "@/components/ui/modal/ModalMain";
import { TableState } from "@/components/ui/table/TableState";

export default async function StatesPage() {
  const state = await ListStates();
  return (
    <div className="container">
      <h3 className="text-xl font-semibold">Estados</h3>
      <div className="my-3">
        <ModalMain title="Registrar Nuevo Estado">
          <StatesForm />
        </ModalMain>
      </div>
      <TableState items={state} />
    </div>
  );
}
