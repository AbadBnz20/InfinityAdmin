"use client";
import { Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputFile } from "../ui/File/InputFile";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { InsertCar } from "@/actions/car.actions";
import { toast } from "react-toastify";
import { useModalStore } from "@/store/ModalStore";

export interface StateFormCard {
  carId?: string;
  model: string;
  plate: string;
  ability: string;
  image: File;
  description: string;
  transferprice: string;
}
export const CarForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<StateFormCard>();
  const { onClose } = useModalStore();
  const [loading, setLoading] = useState(false);
  const OnSubmit = async (state: StateFormCard) => {
    try {
      setLoading(true);
      const resp = await InsertCar(state);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Ha ocurrido un error inesperado", {
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)}>
      <div className="grid gap-3">
        <Input
          type="text"
          label="Modelo"
          placeholder="Ingrese modelo"
          {...register("model", { required: "El campo es requerido" })}
          value={watch("model")}
          isInvalid={!!errors.model}
          errorMessage={errors.model?.message}
        />
        <Input
          type="text"
          label="Placa"
          placeholder="Ingrese placa"
          {...register("plate", { required: "El campo es requerido" })}
          value={watch("plate")}
          isInvalid={!!errors.plate}
          errorMessage={errors.plate?.message}
        />
        <Input
          type="text"
          label="Capacidad"
          placeholder="Ingrese capacidad"
          {...register("ability", {
            required: "El campo es requerido",
            pattern: {
              value: /^[0-9]+$/,
              message: "Solo se permiten números",
            },
          })}
          value={watch("ability")}
          isInvalid={!!errors.ability}
          errorMessage={errors.ability?.message}
        />
        <Textarea
          type="text"
          label="Descripcion"
          placeholder="Ingrese descripcion"
          {...register("description", { required: "El campo es requerido" })}
          value={watch("description")}
          isInvalid={!!errors.description}
          errorMessage={errors.description?.message}
        />
        <Input
          type="text"
          label="Precio por traslado"
          placeholder="Ingrese precio"
          {...register("transferprice", {
            required: "El campo es requerido",
            pattern: {
              value: /^[0-9]+$/,
              message: "Solo se permiten números",
            },
          })}
          value={watch("transferprice")}
          isInvalid={!!errors.transferprice}
          errorMessage={errors.transferprice?.message}
        />
        <InputFile control={control} watch={watch} errors={errors} />
      </div>
      <CotentButtonForm state={loading} />
    </form>
  );
};
