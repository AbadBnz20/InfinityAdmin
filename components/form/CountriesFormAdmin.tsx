import { InsertCountry } from "@/actions/countries.action";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  handleCountriesChange: () => Promise<void>
}
export interface State {
  id?: string;
  name: string;
}

export const CountriesFormAdmin = ({ onClose,handleCountriesChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<State>();

  const [loading, setLoading] = useState(false);

  const OnSubmit = async (state: State) => {
    setLoading(true);
    try {
      const resp = await InsertCountry(state.name, state.id);
      if (!resp.status) {
        onClose();
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      handleCountriesChange()
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
        {...register("name", { required: "El campo es requerido" })}
        value={watch("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <div className="mt-5 flex justify-end flex-row col-span-2 gap-2">
        <Button color="danger" variant="light" onPress={onClose}>
          Cerrar
        </Button>
        <Button isLoading={loading}  color="primary"  onClick={handleSubmit(OnSubmit)}>
          Guardar
        </Button>
      </div>
    </div>
  );
};
