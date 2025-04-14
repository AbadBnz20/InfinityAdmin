"use client";

import { GetPackageRoom, InterRoom } from "@/actions/room.action";
import { useModalStore } from "@/store/ModalStore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { InputFileRoom } from "../ui/File/InputFileRoom";
import { Input, Textarea } from "@nextui-org/react";

export interface StateFormRoom {
  IdRoom?: string;
  url?: string;
  image: File;
  name: string;
  numberOfBeds: string;
  typeOfBed: string;
  detail: string;
  numberOfGuests: string;
}

export const RoomForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<StateFormRoom>();

  const { onClose, idItem } = useModalStore();
  const [loading, setLoading] = useState(false);


useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetPackageRoom(idItem);
        setValue('IdRoom',resp.IdRoom);
        setValue('name',resp.name);
        setValue('numberOfBeds',resp.numberOfBeds.toString());
        setValue('detail',resp.detail);
        setValue('numberOfGuests',resp.numberOfGuests.toString());
        setValue('typeOfBed',resp.typeOfBed);
        setValue("url",resp.url);

      }
    };

    GetItem();
  }, [idItem]);


  const OnSubmit = async (state: StateFormRoom) => {
    // console.log(state);
    try {
      setLoading(true);
      const resp = await InterRoom(state);
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
          label="Nombre"
          placeholder="Ingrese nombre"
          {...register("name", {
            required: "El campo es requerido",
          })}
          value={watch("name")}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <Input
          type="number"
          label="Nro Camas"
          placeholder="Ingrese camas"
          {...register("numberOfBeds", {
            required: "El campo es requerido",
          })}
          value={watch("numberOfBeds")}
          isInvalid={!!errors.numberOfBeds}
          errorMessage={errors.numberOfBeds?.message}
        />
        <Input
          type="text"
          label="Tipo de camas"
          placeholder="Ingrese tipo"
          {...register("typeOfBed", {
            required: "El campo es requerido",
          })}
          value={watch("typeOfBed")}
          isInvalid={!!errors.typeOfBed}
          errorMessage={errors.typeOfBed?.message}
        />
        <Input
          type="number"
          label="Nro Huéspedes"
          placeholder="Ingrese huespedes"
          {...register("numberOfGuests", {
            required: "El campo es requerido",
          })}
          value={watch("numberOfGuests")}
          isInvalid={!!errors.numberOfGuests}
          errorMessage={errors.numberOfGuests?.message}
        />
        <Textarea
          type="text"
          label="Detalle"
          placeholder="Ingrese detalle"
          {...register("detail", {
            required: "El campo es requerido",
          })}
          value={watch("detail")}
          isInvalid={!!errors.detail}
          errorMessage={errors.detail?.message}
        />

        <InputFileRoom
          control={control}
          watch={watch}
          errors={errors}
          isRequired={!idItem}
        />
      </div>
      <CotentButtonForm state={loading} />
    </form>
  );
};
