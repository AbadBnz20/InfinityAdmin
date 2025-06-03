'use client';

import { useModalStore } from "@/store/ModalStore";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { InputFileYachts } from "../ui/File/InputFileYachts";
import { GetPackageYachts, InsertPackageYachts } from "@/actions/packageyachts";
import { SelectDestinationYachts } from "../select/SelectDestinationYachts";



export interface StateFormPackageYachts {
    yachtPackageId?: string,
    url?: string;
    image:File,
    name: string,
    time: string,
    passengers: string,
    price: string,
    points: string,
    state: boolean,
    ubicationId: string,
    cabin: string,
    name_en:string,
    cabin_en:string,
   
}

export const PackageYachtsForm = () => {
 const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<StateFormPackageYachts>();
  const { onClose, idItem } = useModalStore();
  const [loading, setLoading] = useState(false);
  const value = watch("ubicationId");


useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetPackageYachts(idItem);
        setValue('yachtPackageId',resp.yachtPackageId);
        setValue('name',resp.name);
        setValue('passengers',resp.passengers);
        setValue('time',resp.time);
        setValue('price',resp.price.toString());
        setValue('points',resp.points.toString());
        setValue('ubicationId',resp.ubicationId);
        setValue('cabin',resp.cabin);
        setValue('name_en',resp.name_en);
        setValue('cabin_en',resp.cabin_en);
        setValue("url",resp.image);

      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: StateFormPackageYachts) => {
    // console.log(state);
    try {
      setLoading(true);
      const resp = await InsertPackageYachts(state);
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
        placeholder="Ingrese marca"
        {...register("name", {
          required: "El campo es requerido",
        })}
        value={watch("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Input
        type="text"
        label="Nombre (Inglés)"
        placeholder="Ingrese marca"
        {...register("name_en", {
          required: "El campo es requerido",
        })}
        value={watch("name_en")}
        isInvalid={!!errors.name_en}
        errorMessage={errors.name_en?.message}
      />
      <Input
        type="number"
        label="Tiempo"
        startContent={
            <div>
                <span className="text-small">Horas: </span>
            </div>
        }
        placeholder="Ingrese modelo"
        {...register("time", { required: "El campo es requerido" })}
        value={watch("time")}
        isInvalid={!!errors.time}
        errorMessage={errors.time?.message}
      />
      <Input
        type="text"
        label="Camarote"
        placeholder="Ingrese camarote"
        {...register("cabin", {
          required: "El campo es requerido",
        })}
        value={watch("cabin")}
        isInvalid={!!errors.cabin}
        errorMessage={errors.cabin?.message}
      />
       <Input
        type="text"
        label="Camarote (Inglés)"
        placeholder="Ingrese camarote"
        {...register("cabin_en", {
          required: "El campo es requerido",
        })}
        value={watch("cabin_en")}
        isInvalid={!!errors.cabin_en}
        errorMessage={errors.cabin_en?.message}
      />
      <Input
        type="number"
        label="Pasajeros"
        placeholder="Ingrese placa"
        {...register("passengers", { required: "El campo es requerido" })}
        value={watch("passengers")}
        isInvalid={!!errors.passengers}
        errorMessage={errors.passengers?.message}
      />
      <Input
        type="number"
        label="Precio"
        placeholder="Ingrese capacidad"
        {...register("price", {
          required: "El campo es requerido",
        })}
        value={watch("price")}
        isInvalid={!!errors.price}
        errorMessage={errors.price?.message}
      />
      <Input
        type="number"
        label="Puntos"
        placeholder="Ingrese tipo"
        {...register("points", {
          required: "El campo es requerido",
        })}
        value={watch("points")}
        isInvalid={!!errors.points}
        errorMessage={errors.points?.message}
      />
      <SelectDestinationYachts  control={control} name="ubicationId" error={errors.ubicationId} value={value} />
      <InputFileYachts control={control} watch={watch} errors={errors} isRequired={!idItem} />
    </div>
    <CotentButtonForm state={loading} />
  </form>
  )
}
