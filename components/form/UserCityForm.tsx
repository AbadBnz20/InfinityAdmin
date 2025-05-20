'use client';

import { GetSUserCity, InsertUserCity } from "@/actions/usercity.action";
import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SelectState } from "../select/SelectState";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { State } from "@/interfaces/state-interfaces";




 interface CityForm {
    id?: string;
    name: string;
    IdState: string;
  }

  interface Props {
    state:State[]
  }

export const UserCityForm = ({state}:Props) => {
     const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
      } = useForm<CityForm>();
const value = watch("IdState");

  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();


   useEffect(() => {
      const GetItem = async () => {
        if (idItem) {
          const resp = await GetSUserCity(idItem);
          setValue("id", resp.IdUserCity);
          setValue("name", resp.name);
          setValue("IdState", resp.IdState);
        }
      };
  
      GetItem();
    }, [idItem]);

 const OnSubmit = async (state: CityForm) => {
    setLoading(true);
    try {
      const resp = await InsertUserCity(state.name, state.IdState, state.id);
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

      <SelectState
      control={control}
        state={state}
        name="IdState"
        register={register}
        errors={errors.IdState}
        value={value}
      />
      <CotentButtonForm state={loading} />
    </form>
  )
}
