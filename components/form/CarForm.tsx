"use client";
import { Input, Textarea } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputFile } from "../ui/File/InputFile";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { GetCar, InsertCar } from "@/actions/car.actions";
import { toast } from "react-toastify";
import { useModalStore } from "@/store/ModalStore";

export interface StateFormCard {
  carId?: string;
  url?: string;
  model: string;
  plate: string;
  type: string;
  brand: string;
  color: string;
  ability: string;
  image: File;
  description: string;
  transferprice: string;
  model_en: string;
  description_en: string;
  type_en: string;
  brand_en: string;
  color_en: string;
}
export const CarForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<StateFormCard>();
  const { onClose, idItem } = useModalStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetCar(idItem);
        setValue("carId", resp.carId);
        setValue("model", resp.model);
        setValue("plate", resp.plate);
        setValue("type", resp.type);
        setValue("brand", resp.brand);
        setValue("color", resp.color);
        setValue("ability", resp.ability.toString());
        setValue("description", resp.description);
        setValue("transferprice", resp.transferprice.toString());

        setValue("model_en", resp.model_en);
        setValue("description_en", resp.description_en);
        setValue("type_en", resp.type_en);
        setValue("brand_en", resp.brand_en);
        setValue("color_en", resp.color_en);

        // const imageFile = await urlToFile(resp.image, "image.jpg");
        // setValue("image", imageFile);
        setValue("url", resp.image);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: StateFormCard) => {
    // console.log(state);
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
          label="Marca"
          placeholder="Ingrese marca"
          {...register("brand", {
            required: "El campo es requerido",
          })}
          value={watch("brand")}
          isInvalid={!!errors.brand}
          errorMessage={errors.brand?.message}
        />
          <Input
          type="text"
          label="Marca (Inglés)"
          placeholder="Ingrese marca"
          {...register("brand_en", {
            required: "El campo es requerido",
          })}
          value={watch("brand_en")}
          isInvalid={!!errors.brand_en}
          errorMessage={errors.brand_en?.message}
        />
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
          label="Modelo (Inglés)"
          placeholder="Ingrese modelo"
          {...register("model_en", { required: "El campo es requerido" })}
          value={watch("model_en")}
          isInvalid={!!errors.model_en}
          errorMessage={errors.model_en?.message}
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
          type="number"
          label="Capacidad"
          placeholder="Ingrese capacidad"
          {...register("ability", {
            required: "El campo es requerido",
          })}
          value={watch("ability")}
          isInvalid={!!errors.ability}
          errorMessage={errors.ability?.message}
        />
        <Input
          type="text"
          label="Tipo"
          placeholder="Ingrese tipo"
          {...register("type", {
            required: "El campo es requerido",
          })}
          value={watch("type")}
          isInvalid={!!errors.type}
          errorMessage={errors.type?.message}
        />
         <Input
          type="text"
          label="Tipo (Inglés)"
          placeholder="Ingrese tipo"
          {...register("type_en", {
            required: "El campo es requerido",
          })}
          value={watch("type_en")}
          isInvalid={!!errors.type_en}
          errorMessage={errors.type_en?.message}
        />
        <Input
          type="text"
          label="Color"
          placeholder="Ingrese color"
          {...register("color", {
            required: "El campo es requerido",
          })}
          value={watch("color")}
          isInvalid={!!errors.color}
          errorMessage={errors.color?.message}
        />
        <Input
          type="text"
          label="Color (Inglés)"
          placeholder="Ingrese color"
          {...register("color_en", {
            required: "El campo es requerido",
          })}
          value={watch("color_en")}
          isInvalid={!!errors.color_en}
          errorMessage={errors.color_en?.message}
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
         <Textarea
          type="text"
          label="Descripcion (Inglés)"
          placeholder="Ingrese descripcion"
          {...register("description_en", { required: "El campo es requerido" })}
          value={watch("description_en")}
          isInvalid={!!errors.description_en}
          errorMessage={errors.description_en?.message}
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
        <InputFile
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
