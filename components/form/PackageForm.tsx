"use client";
import { Input, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { GetPackage, InsertPackages } from "@/actions/package.action";
import { useModalStore } from "@/store/ModalStore";
import { toast } from "react-toastify";

export interface FormStatePackage {
  id?: string;
  name: string;
  description: string;
  percentage: string;
  price: string;
}

export const PackageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormStatePackage>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();


  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetPackage(idItem);
        setValue("id", resp.packageId);
        setValue("name", resp.name);
        setValue("description", resp.description);
        setValue("percentage", resp.percentage.toString());
        setValue("price", resp.price.toString());
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: FormStatePackage) => {
    setLoading(true);
    try {
      const resp = await InsertPackages(state);
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
    <form className="grid gap-3" onSubmit={handleSubmit(OnSubmit)}>
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
        type="text"
        label="Procentaje"
        placeholder="Ingrese porcentaje"
        {...register("percentage", {
          required: "El campo es requerido",
          pattern: {
            value: /^[0-9]+$/,
            message: "Solo se permiten números",
          },
        })}
        value={watch("percentage")}
        isInvalid={!!errors.percentage}
        errorMessage={errors.percentage?.message}
      />
      <Input
        type="text"
        label="Precio"
        placeholder="Ingrese precio"
        {...register("price", {
          required: "El campo es requerido",
          pattern: {
            value: /^[0-9]+$/,
            message: "Solo se permiten números",
          },
        })}
        value={watch("price")}
        isInvalid={!!errors.price}
        errorMessage={errors.price?.message}
      />
      <Textarea
        label="Descripcion"
        placeholder="Ingrese descripcion"
        {...register("description", { required: "El campo es requerido" })}
        value={watch("description")}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
      />

      <CotentButtonForm state={loading} />
    </form>
  );
};
