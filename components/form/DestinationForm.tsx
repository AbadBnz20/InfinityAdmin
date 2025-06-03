"use client";

import { GetDestination, InsertDestination } from "@/actions/destinations.action";
import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SelectCategory } from "../select/SelectCategory";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";

export interface DestinationForm {
  id?: string;
  name: string;
  name_en:string;
  categoryoriginId: string;
}
export const DestinationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DestinationForm>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();

  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetDestination(idItem);
        setValue("id", resp.origindestinationId);
        setValue("name", resp.name);
        setValue("name_en", resp.name_en);
        setValue("categoryoriginId", resp.categoryoriginId);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: DestinationForm) => {
    setLoading(true);
    try {
      const resp = await InsertDestination(
        state.name,
        state.categoryoriginId,
        state.name_en,
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
        type="text"
        label="Nombre (Inglés)"
        placeholder="Ingrese nombre"
        className="mt-3"
        {...register("name_en", { required: "El campo es requerido" })}
        value={watch("name_en")}
        isInvalid={!!errors.name_en}
        errorMessage={errors.name_en?.message}
      />

      <SelectCategory register={register} errors={errors} watch={watch} />
      <CotentButtonForm state={loading} />
    </form>
  );
};
