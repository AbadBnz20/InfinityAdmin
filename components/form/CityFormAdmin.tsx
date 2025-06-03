import { InsertCity } from "@/actions/ctity.action";
import { State } from "@/interfaces/state-interfaces";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SelectState } from "../select/SelectState";
export interface CityForm {
  id?: string;
  name: string;
  stateId: string;
}

interface Props {
  onClose: () => void;
  handleChange: () => Promise<void>;
  state: State[];
}

export const CityFormAdmin = ({ onClose, handleChange, state }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CityForm>();
  const value = watch("stateId");
  const [loading, setLoading] = useState(false);

  const OnSubmit = async (state: CityForm) => {
    setLoading(true);
    try {
      const resp = await InsertCity(state.name, state.stateId, state.id);
      if (!resp.status) {
        onClose();
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      handleChange();
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
        state={state}
        control={control}
        name="stateId"
        register={register}
        errors={errors.stateId}
        value={value}
        isfilter
      />
      <div className="mt-5 flex justify-end flex-row col-span-2 gap-2">
        <Button color="danger" variant="light" onPress={onClose}>
          Cerrar
        </Button>
        <Button
          isLoading={loading}
          color="primary"
          onClick={handleSubmit(OnSubmit)}
        >
          Guardar
        </Button>
      </div>
    </form>
  );
};
