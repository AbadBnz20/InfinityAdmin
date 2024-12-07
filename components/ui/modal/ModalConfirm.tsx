import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { DeleteIcon } from "../icons/delete-icon";

interface Props {
  idItem: string;
  Ondelete: (id: string) => void;
}

export const ModalConfirm = ({ Ondelete, idItem }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const OnDelete = async (onClose: () => void) => {
    setLoading(true);
    try {
     await Ondelete(idItem);
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
    onClose();
  };
  return (
    <>
      <div>
        <Tooltip content="Eliminar " color="danger" >
          <button onClick={onOpen}>
            <DeleteIcon size={20} fill="#FF0080" />
          </button>
        </Tooltip>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="flex justify-center flex-col items-center text-center">
                  <IoAlertCircleOutline size={"50px"} color="#f31260" />
                  <h1>
                    <p className="font-semibold text-medium my-2"> ¿Está seguro de que desea eliminar este elemento?</p>
                    Se eliminará de forma permanente.
                  </h1>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-[50%]"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
                <Button
                  isLoading={loading}
                  className="w-[50%] bg-black text-white"
                  onPress={() => OnDelete(onClose)}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
