"use client";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { signInAction, signInActionVerifyOTP } from "@/actions/auth.action";
import { SignInModal } from "./SignInModal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

interface State {
  email: string;
}
interface Props {
  captchaToken: string;
}

export const SignIn = ({ captchaToken }: Props) => {
  const { register, handleSubmit, watch } = useForm<State>();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const emailValue = watch("email");
  const OnSubmit = async (state: State) => {
    setLoading(true);
    // console.log(captchaToken)
    const resp = await signInAction(state.email, captchaToken);
    // console.log(resp)
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
      <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col gap-4">
        <Input
          isRequired
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: "El campo de Email es requerido",
          })}
        />
        <div className="flex gap-2 justify-end">
          <Button fullWidth color="primary" type="submit" isLoading={loading}>
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
        functionvalidate={signInActionVerifyOTP}
      />
    </>
  );
};
