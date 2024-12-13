'use client';

import { Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
// import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
// import { useState } from "react";
import { AutoCompleteProfile } from "../select/AutoCompleteProfile";

export interface StateForm {
    id?: string;
    name: string;
    countryId: string;
  }

export const PhoneForm = () => {
  // const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
      } = useForm<StateForm>();

      const Onsubmit = (form:StateForm) => {
        console.log(form);
      }


  return (
    <form className="grid gap-3" onSubmit={handleSubmit(Onsubmit)}>
    <Input
      type="text"
      label="Nombre"
      placeholder="Ingrese nombre"
      {...register("name", { required: "El campo es requerido" })}
      value={watch("name")}
      isInvalid={!!errors.name}
      errorMessage={errors.name?.message}
    />

    <AutoCompleteProfile/>
    {/* <CotentButtonForm state={loading} /> */}
  </form>
  )
}
