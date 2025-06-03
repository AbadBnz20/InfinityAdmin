'use client';

import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { toast } from "react-toastify";
import { GetCategoryCars, InsertCategoryCars } from "@/actions/categorycars";

interface StateForm {
  id?: string;
  name: string;
  name_en:string;
}
export const CategoryCarForm = () => {
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
          if (idItem) {
            const resp = await GetCategoryCars(idItem);
            setValue("id", resp.categoryCarId);
            setValue("name", resp.name);
            setValue("name_en", resp.name_en);
          }
        };
    
        GetItem();
      }, [idItem]);


      const OnSubmit = async (state: StateForm) => {
        setLoading(true);
    try {
      const resp = await InsertCategoryCars(state.name,state.name_en,state.id);
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
      }

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

      <CotentButtonForm state={loading} />
    </form>
  )
};
