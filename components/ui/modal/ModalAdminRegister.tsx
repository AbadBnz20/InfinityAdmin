import {

  Modal,
  ModalBody,
  ModalContent,

  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

interface Props {
  title: string;
  children: (onClose: () => void) => React.ReactNode;
}

export const ModalAdminRegister = ({ title, children }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div
        className=" m-1 flex items-center justify-center w-5 h-5 rounded-lg bg-blue-500 cursor-pointer"
        onClick={onOpen}
      >
        +
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{children(onClose)}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
