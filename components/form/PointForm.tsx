"use client";
import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { EditPoints, GetPoints } from "@/actions/point.action";

export interface StateForm {
  id: string;
  points: string;
  dollar: string;
}

export const PointForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StateForm>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();

  useEffect(() => {
    const GetItem = async () => {
      const resp = await GetPoints();
      setValue("id", resp.idPointDollar);
      setValue("points", resp.points);
      setValue("dollar", resp.dollar);
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: StateForm) => {
    setLoading(true);
    try {

      const resp = await EditPoints(state.points, state.dollar, state.id);
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
        label="Punto"
        placeholder="Ingrese punto"
        {...register("points", { required: "El campo es requerido" })}
        value={watch("points")}
        isInvalid={!!errors.points}
        errorMessage={errors.points?.message}
      />
      <Input
        type="text"
        label="Dolar ($)"
        placeholder="Ingrese valor"
        className="mt-2"
        {...register("dollar", { required: "El campo es requerido" })}
        value={watch("dollar")}
        isInvalid={!!errors.dollar}
        errorMessage={errors.dollar?.message}
      />

      <CotentButtonForm state={loading} />
    </form>
  );
};
