import { InsertState } from "@/actions/state.action";
import { Countries } from "@/interfaces/countries-interfaces";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SelectCountry } from "../select/SelectCountry";
interface Props {
  onClose: () => void;
  handleChange: () => Promise<void>;
  countries: Countries[];
}
export interface StateForm {
  id?: string;
  name: string;
  countryId: string;
}
export const StateFormAdmin = ({ onClose, handleChange, countries }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<StateForm>();
  const [loading, setLoading] = useState(false);
  const value = watch("countryId");

  const OnSubmit = async (state: StateForm) => {
    setLoading(true);
    try {
      const resp = await InsertState(state.name, state.countryId, state.id);
      if (!resp.status) {
        onClose();
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      handleChange()
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
    <div className="my-2">
      <Input
        type="text"
        label="Nombre"
        placeholder="Ingrese nombre"
        className="mb-2"
        {...register("name", { required: "El campo es requerido" })}
        value={watch("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />

      <SelectCountry
        control={control}
        countries={countries}
        register={register}
        errors={errors.countryId}
        name="countryId"
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
    </div>
  );
};
