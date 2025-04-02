import { GetCountryActive } from "@/actions/countries.action";
import { Countries } from "@/interfaces/countries-interfaces";
import { SelectStore } from "@/store/SelectStore";
import { Progress, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldError;
  name: Path<T>;
  value: PathValue<T, Path<T>>;
}
export const SelectCountry = <T extends FieldValues>({
  register,
  errors,
  name,
  value,
}: Props<T>) => {
  const [data, setdata] = useState<Countries[]>([]);
  const [loading, setLoading] = useState(false);
  const {setCountry}= SelectStore();
  useEffect(() => {
    const GetCountry = async () => {
      setCountry(value)
      setLoading(true);
      const resp = await GetCountryActive();
      setdata(resp);
      setLoading(false);

    };

    GetCountry();
  }, [value]);
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
      label="Pais"
      placeholder="Seleccione Pais"
    
      {...register(name, { required: "El Pais es requerido" })}
      isInvalid={!!errors}
      errorMessage={errors?.message}
    >
      {(animal) => (
        <SelectItem key={animal.countryId}>{animal.name}</SelectItem>
      )}
    </Select>
  );
};
