import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

interface Props {
  isOpen: boolean;
  isloading: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  text: {
    status: boolean;
    message: string;
  }[];
}

export const ModalInformation = ({
  text,
  isOpen,
  onClose,
  onOpenChange,
  isloading,
}: Props) => {
  return (
    <>
      <Modal
        hideCloseButton
        scrollBehavior={"inside"}
        isDismissable={false}
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Informacion de registro.
            </ModalHeader>
            <ModalBody>
              <div className=" grid justify-center  min-h-[230px] ">
                <h1>Registro</h1>
                <div className="mt-5">
                  {text.length === 0 ? (
                    <p> Sin registros</p>
                  ) : (
                    text.map((item, index) => (
                      <div key={index} className="flex gap-3 items-center my-2">
                        <div className="col-span-1">
                          {item.status ? (
                            <IoCheckmarkCircleOutline size={24} />
                          ) : (
                            <IoCloseCircleOutline size={24} />
                          )}
                        </div>
                        <div className="col-span-2">
                          <p className="text-small">{item.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                isLoading={isloading}
                color="danger"
                onPress={onClose}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
