import { Button, Input, useDisclosure } from "@nextui-org/react";
import { SelectCode } from "./SelectCode";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  signInActionPhone,
  signInActionVerifyOTPPhone,
} from "@/actions/auth.action";
import { toast } from "react-toastify";
import { SignInModal } from "./SignInModal";

export interface StateForm {
  code: string;
  phone: string;
}
interface Props{
  captchaToken: string
}

export const SignUp = ({captchaToken}:Props) => {
  const { register, handleSubmit, watch, control } = useForm<StateForm>();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const emailValue = `${watch("code")}${watch("phone")}`;

  const Onhandle = async (state: StateForm) => {
    setLoading(true);

    const resp = await signInActionPhone(
      `${state.code}${state.phone}`,
      captchaToken
    );
    if (!resp.status) {
      setLoading(false);
      return toast.error(resp.message, {
        position: "top-right",
      });
    }
    onOpen();
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit(Onhandle)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0">
          <SelectCode control={control} />
          <Input
            className="col-span-2"
            classNames={{
              inputWrapper: "rounded-none  rounded-br-md rounded-tr-md",
            }}
            radius="none"
            isRequired
            {...register("phone", {
              required: "El campo de phone es requerido",
            })}
            label="Phone"
            placeholder="Enter your phone"
            type="number"
          />
        </div>
     
        <div className="flex gap-2 justify-end">
          <Button isLoading={loading} type="submit" fullWidth color="primary">
            Login
          </Button>
        </div>
      </form>
      <SignInModal
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        email={emailValue}
        functionvalidate={signInActionVerifyOTPPhone}
      />
    </>
  );
};
