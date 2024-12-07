"use client";
import { useModalStore } from "@/store/ModalStore";
import {  Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { GetCountry, InsertCountry } from "@/actions/countries.action";
import { toast } from "react-toastify";

export interface State {
  id?: string;
  name: string;
}

export const CountriesForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<State>();
  const { onClose, idItem } = useModalStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetCountry(idItem);
        setValue("id", resp.countryId);
        setValue("name", resp.name);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: State) => {
    setLoading(true);
    try {
      const resp = await InsertCountry(state.name, state.id);
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
      <CotentButtonForm state={loading} />
    </form>
  );
};
