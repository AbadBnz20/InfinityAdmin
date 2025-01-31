"use client";
import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { GetCategory, InsertCategory } from "@/actions/destinations.action";

export interface State {
  id?: string;
  name: string;
}
export const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<State>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();

 useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetCategory(idItem);
        setValue("id", resp.categoryId);
        setValue("name", resp.name);
      }
    };

    GetItem();
  }, [idItem]);


  const OnSubmit = async (state: State) => {
    setLoading(true);
    try {
      const resp = await InsertCategory(state.name, state.id);
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
        {...register("name", { required: "El campo es requerido" })}
        value={watch("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <CotentButtonForm state={loading} />
    </form>
  );
};
