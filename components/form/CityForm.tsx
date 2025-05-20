"use client";

export interface CityForm {
  id?: string;
  name: string;
  stateId: string;
}

import { GetState, InsertCity } from "@/actions/ctity.action";
import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { SelectState } from "../select/SelectState";
import { State } from "@/interfaces/state-interfaces";

 interface Props{
  state:State[];
 }


export const CityForm = ({state}:Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CityForm>();
  const value = watch("stateId");

  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();

  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetState(idItem);
        setValue("id", resp.cityId);
        setValue("name", resp.name);
        setValue("stateId", resp.stateId);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: CityForm) => {
    setLoading(true);
    try {
      const resp = await InsertCity(state.name, state.stateId, state.id);
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
      console.log(error);
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
        className="mb-3"
        {...register("name", { required: "El campo es requerido" })}
        value={watch("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />

      <SelectState
       state={state}
        control={control}
        name="stateId"
        register={register}
        errors={errors.stateId}
        value={value}
      />
      <CotentButtonForm state={loading} />
    </form>
  );
};
