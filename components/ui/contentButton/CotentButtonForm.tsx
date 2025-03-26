import { useModalStore } from "@/store/ModalStore";
import { Button } from "@nextui-org/react";
import React from "react";

interface Props {
  state:boolean
}
export const CotentButtonForm = ({state}:Props) => {
  const { onClose } = useModalStore();

  return (
    <div className="mt-5 flex justify-end flex-row col-span-2 gap-2">
      <Button color="danger" variant="light" onPress={onClose}>
        Cerrar
      </Button>
      <Button isLoading={state} type="submit" color="primary">
        Guardar
      </Button>
    </div>
  );
};
