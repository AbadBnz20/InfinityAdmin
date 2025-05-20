"use client";
import {
  GetDestinationShip,
  InsertDestinationShip,
} from "@/actions/destinationship";
import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { SelectCity } from "../select/SelectCity";
import { City } from "@/interfaces/city-interfaces";

export interface DestinationShip {
  id?: string;
  name: string;
  cityId: string;
}


interface Props {
  cities:City[];
}
export const DestinationShipForm = ({cities}:Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DestinationShip>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();
  const value = watch("cityId");
  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetDestinationShip(idItem);
        setValue("id", resp.origin_destination_ship_id);
        setValue("cityId", resp.cityId);
        setValue("name", resp.name);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: DestinationShip) => {

    setLoading(true);
    try {
      const resp = await InsertDestinationShip(state.name,state.cityId, state.id);
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
      <SelectCity cities={cities}  control={control} name="cityId" error={errors.cityId} value={value} />
      <CotentButtonForm state={loading} />
    </form>
  );
};
