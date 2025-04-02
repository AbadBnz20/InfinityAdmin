import React, { useEffect, useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
} from "react-hook-form";
import { State } from "@/interfaces/state-interfaces";
import { GetStateActive } from "@/actions/user.action";
import { Progress, Select, SelectItem } from "@nextui-org/react";
import { SelectStore } from "@/store/SelectStore";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldError;
  // watch: UseFormWatch<T>;
  name: Path<T>;
  value: PathValue<T, Path<T>>;
}

export const SelectState = <T extends FieldValues>({
  register,
  errors,
  name,
  value,
}: Props<T>) => {
  const [data, setdata] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
    const {idCountry,setState}= SelectStore();
  
  useEffect(() => {
    const GetCountry = async () => {
      setState(value)
      setLoading(true);
      const resp = await GetStateActive(idCountry);
      setdata(resp);
      setLoading(false);
    };

    GetCountry();
  }, [value,idCountry]);
  
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
      {...register(name, { required: "El Estado es requerido" })}
      isInvalid={!!errors}
      errorMessage={errors?.message}
    >
      {(animal) => <SelectItem key={animal.stateId}>{animal.name}</SelectItem>}
    </Select>
  );
};
