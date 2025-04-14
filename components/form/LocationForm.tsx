"use client";

import { GetLocation, InsertLocation } from "@/actions/location.action";
import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";

export interface LocationForm {
  id?: string;
  name: string;
  address: string;
  phone: string;
  city: string;
  country: string;
  codePostal: string;
  rfc: string;
  percentage: string;
}

export const LocationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LocationForm>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();

  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetLocation(idItem);
        setValue("id", resp.IdLocation);
        setValue("name", resp.name);
        setValue("address", resp.address);
        setValue("phone", resp.phone);
        setValue("city", resp.city);
        setValue("country", resp.country);
        setValue("codePostal", resp.codePostal);
        setValue("rfc", resp.rfc);
        setValue("percentage", resp.percentage);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: LocationForm) => {
    setLoading(true);
    try {
      const resp = await InsertLocation(
        state.name,
        state.address,
        state.phone,
        state.city,
        state.country,
        state.codePostal,
        state.rfc,
        state.percentage,
        state.id
      );
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
      <Input
        className="mt-3"
        type="text"
        label="Direccion"
        placeholder="Ingrese direccion"
        {...register("address", { required: "El campo es requerido" })}
        value={watch("address")}
        isInvalid={!!errors.address}
        errorMessage={errors.address?.message}
      />
      <Input
        className="mt-3"
        type="text"
        label="Celular"
        placeholder="Ingrese celular "
        {...register("phone", { required: "El campo es requerido" })}
        value={watch("phone")}
        isInvalid={!!errors.phone}
        errorMessage={errors.phone?.message}
      />
      <Input
        className="mt-3"
        type="text"
        label="Ciudad"
        placeholder="Ingrese ciudad"
        {...register("city", { required: "El campo es requerido" })}
        value={watch("city")}
        isInvalid={!!errors.city}
        errorMessage={errors.city?.message}
      />
      <Input
        className="mt-3"
        type="text"
        label="Pais"
        placeholder="Ingrese pais"
        {...register("country", { required: "El campo es requerido" })}
        value={watch("country")}
        isInvalid={!!errors.country}
        errorMessage={errors.country?.message}
      />
      <Input
        className="mt-3"
        type="text"
        label="Codigo Postal"
        placeholder="Ingrese  codigo postal"
        {...register("codePostal", { required: "El campo es requerido" })}
        value={watch("codePostal")}
        isInvalid={!!errors.codePostal}
        errorMessage={errors.codePostal?.message}
      />

      <Input
        className="mt-3"
        type="text"
        label="RFC"
        placeholder="Ingrese RFC"
        {...register("rfc", { required: "El campo es requerido" })}
        value={watch("rfc")}
        isInvalid={!!errors.rfc}
        errorMessage={errors.rfc?.message}
      />
      <Input
      className="mt-3"
        type="number"
        label="Porcentaje"
        placeholder="Ingrese porcentaje"
        {...register("percentage", { required: false })}
        value={watch("percentage")}
        isInvalid={!!errors.percentage}
        errorMessage={errors.percentage?.message}
      />
      <CotentButtonForm state={loading} />
    </form>
  );
};
