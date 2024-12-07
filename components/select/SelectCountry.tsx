import { GetCountryActive } from "@/actions/countries.action";
import { Countries } from "@/interfaces/countries-interfaces";
import { Progress, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { StateForm } from "../form/StatesForm";


interface Props {
  register: UseFormRegister<StateForm>;
  errors: FieldErrors<StateForm>;
  watch: UseFormWatch<StateForm>;
}
export const SelectCountry = ({ register, errors, watch }: Props) => {
  const value = watch("countryId");
  const [data, setdata] = useState<Countries[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetCountry = async () => {
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
      className="mt-3"
      defaultSelectedKeys={[value]}
      {...register("countryId", { required: "El Pais es requerido" })}
      isInvalid={!!errors.countryId}
      errorMessage={errors.countryId?.message}
    >
      {(animal) => (
        <SelectItem key={animal.countryId}>{animal.name}</SelectItem>
      )}
    </Select>
  );
};
