'use client';
import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { SelectState } from "../select/SelectState";
import { SelectPackage } from "../select/SelectPackage";
import { SelectLanguage } from "../select/SelectLanguage";
import SelectRole from "../select/SelectRole";
import { InsertUsers } from "@/actions/user.action";
import { toast } from "react-toastify";

export interface StateFormUser {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  photo?: string;
  stateId: string;
  packageId: string;
  languageId: string;
  roleId: string;
}
export const UserForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
      } = useForm<StateFormUser>();
  const [loading, setLoading] = useState(false);
  const { onClose } = useModalStore();
  const OnSubmit = async (state: StateFormUser) => {
    setLoading(true);
    try {
        state.photo='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s'
      const resp = await InsertUsers(state);
      if (!resp.status) {
        onClose();
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      onClose();
      toast.success(resp.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log(error)
      toast.error("Ha ocurrido un error inesperado", {
        position: "top-right",
      });
    }
    setLoading(false);
  };
  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit(OnSubmit)}>
      <Input
        type="text"
        label="Nombre"
        placeholder="Ingrese nombre"
        {...register("firstname", { required: "El campo es requerido" })}
        value={watch("firstname")}
        isInvalid={!!errors.firstname}
        errorMessage={errors.firstname?.message}
      />
       <Input
        type="text"
        label="Apellido"
        placeholder="Ingrese apellido"
        {...register("lastname", { required: "El campo es requerido" })}
        value={watch("lastname")}
        isInvalid={!!errors.lastname}
        errorMessage={errors.lastname?.message}
      />
       <Input
        type="text"
        label="Direccion"
        placeholder="Ingrese Direccion"
        {...register("address", { required: "El campo es requerido" })}
        value={watch("address")}
        isInvalid={!!errors.address}
        errorMessage={errors.address?.message}
      />
       <Input
        type="email"
        label="email"
        placeholder="Ingrese Email"
        {...register("email", { 
            required: "El campo es requerido", 
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Debe ingresar un email válido"
            }
          })}
        value={watch("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
       <Input
        type="text"
        label="Celular"
        placeholder="Ingrese celular"
        {...register("phone", { required: "El campo es requerido" })}
        value={watch("phone")}
        isInvalid={!!errors.phone}
        errorMessage={errors.phone?.message}
        startContent={
        <div>
            <h1>+</h1>
        </div>
        }
      />
        <SelectState register={register} errors={errors} watch={watch}/>
        <SelectPackage register={register} errors={errors} watch={watch}/>
        <SelectLanguage register={register} errors={errors} watch={watch}/>
        <SelectRole register={register} errors={errors} watch={watch}/>
      {/* <SelectCountry register={register} errors={errors} watch={watch} /> */}
      <CotentButtonForm state={loading} />
    </form>
  );
};
