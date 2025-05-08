
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    InputOtp,
  } from "@nextui-org/react";
import { ContentTimer } from '@/app/auth/login/ui/ContentTimer';
interface Props {
    isOpen: boolean;
    identifier: string;
    onClose: () => void;
    onOpenChange: () => void;
    functionvalidate: (
      confirm: string,
      code: string
    ) => Promise<{ status: boolean; message: string }>;
  }
  
  interface State {
    code: string;
  }

export const ModalChange = ({
    isOpen,
    onClose,
    onOpenChange,
    identifier,
    functionvalidate,
  }: Props) => {
 const [loading, setLoading] = useState(false);
 const { register, handleSubmit } = useForm<State>();
 

const onsubmit = async (state: State) => {
    try {
      setLoading(true);
      const res = await functionvalidate(identifier, state.code);
      console.log("respuesta", res);
      if (!res.status) {
        onClose();
        setLoading(false);
        return toast.error(res.message, {
          position: "top-right",
        });
      }
      setLoading(false);
        toast.success(res.message, {
            position: "top-right",
        });
      onClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
      onClose();
    }
  };

  return (
    <>
      <Modal
        hideCloseButton
        isDismissable={false}
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
           Cambio de Email o Celular
            </ModalHeader>
            <ModalBody>
              <ContentTimer />
              <p className="text-center mb-4"> Ingrese Codigo</p>
              <div className="flex justify-center gap-2 my-3">
                <form className="" onSubmit={handleSubmit(onsubmit)}>
                  <InputOtp
                    isRequired
                    size="lg"
                    aria-label="OTP input field"
                    length={6}
                    {...register("code")}
                    placeholder="Enter code"
                    validationBehavior="native"
                  />
                  <Button
                    className="mt-4"
                    type="submit"
                    isLoading={loading}
                    fullWidth
                    color="primary"
                  >
                    Confirmar
                  </Button>
                </form>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
