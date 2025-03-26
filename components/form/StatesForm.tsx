"use client";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { SelectCountry } from "../select/SelectCountry";
import { useModalStore } from "@/store/ModalStore";
import { toast } from "react-toastify";
import { GetState, InsertState } from "@/actions/state.action";

export interface StateForm {
  id?: string;
  name: string;
  countryId: string;
}

export const StatesForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StateForm>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();
 const value = watch("countryId");
  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetState(idItem);
        setValue("id", resp.stateId);
        setValue("name", resp.name);
        setValue("countryId", resp.countryId);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: StateForm) => {
    setLoading(true);
    try {
      const resp = await InsertState(state.name,state.countryId,state.id);
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
    <form onSubmit={handleSubmit(OnSubmit)}>
      <Input
        type="text"
        label="Nombre"
        placeholder="Ingrese nombre"
        {...register("name", { required: "El campo es requerido" })}
        value={watch("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />

      <SelectCountry register={register} errors={errors.countryId} name="countryId" value={value}  />
      <CotentButtonForm state={loading} />
    </form>
  );
};
