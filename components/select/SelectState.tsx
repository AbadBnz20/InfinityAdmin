import React, { useEffect, useState } from "react";
import { StateFormUser } from "../form/UserForm";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { State } from "@/interfaces/state-interfaces";
import { GetStateActive } from "@/actions/user.action";
import { Progress, Select, SelectItem } from "@nextui-org/react";

interface Props {
  register: UseFormRegister<StateFormUser>;
  errors: FieldErrors<StateFormUser>;
  watch: UseFormWatch<StateFormUser>;
}

export const SelectState = ({ register, errors }: Props) => {
  const [data, setdata] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);
      const resp = await GetStateActive();
      setdata(resp);
      setLoading(false);
    };

    GetCountry();
  }, []);
  if (loading) {
    return (
      <div className="my-4">
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
    );
  }
  return (
    <Select
      items={data}
      label="Estado"
      placeholder="Seleccione Estado"
      {...register("stateId", { required: "El Estado es requerido" })}
      isInvalid={!!errors.stateId}
      errorMessage={errors.stateId?.message}
    >
      {(animal) => (
        <SelectItem key={animal.stateId}>{animal.name}</SelectItem>
      )}
    </Select>
  );
};
