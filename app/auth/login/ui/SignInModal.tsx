import {  useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  InputOtp,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenChange: () => void;
  email: string;
  functionvalidate: (confirm: string, code: string) => void;
}

interface State {
  code: string;
}
export const SignInModal = ({
  isOpen,
  onClose,
  onOpenChange,
  email,
  functionvalidate,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<State>();

  const onsubmit = async (state: State) => {
    setLoading(true);
    await functionvalidate(email, state.code);
    setLoading(false);
    onClose();
  };
  

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
        <>
              <ModalHeader className="flex flex-col gap-1">
                Verificar{" "}
              </ModalHeader>
              <ModalBody>
                <p className="text-center mb-4">Ingrese código de 6 dígitos.</p>
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
                    <Button className="mt-4" type="submit" isLoading={loading} fullWidth color="primary">
                      Verificar Codigo
                    </Button>
                  </form>
                </div>
              </ModalBody>
              
            </>
        </ModalContent>
      </Modal>
    </>
  );
};
