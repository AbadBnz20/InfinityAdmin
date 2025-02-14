import React, { useEffect, useState } from "react";
import { DestinationShip } from "../form/DestinationShipForm";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { City } from "@/interfaces/city-interfaces";
import { Progress, Select, SelectItem } from "@nextui-org/react";
import { GetCityActive } from "@/actions/destinationship";

interface Props {
  register: UseFormRegister<DestinationShip>;
  errors: FieldErrors<DestinationShip>;
  watch: UseFormWatch<DestinationShip>;
}

export const SelectCity = ({ register, errors, watch }: Props) => {
  const value = watch("cityId");
  const [data, setdata] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);
      const resp = await GetCityActive();
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
      label="Rol"
      placeholder="Seleccione Ciudad"
      {...register("cityId", { required: "La ciudad es requerido" })}
      isInvalid={!!errors.cityId}
      errorMessage={errors.cityId?.message}
    >
      {(item) => <SelectItem key={item.cityId}>{item.name}</SelectItem>}
    </Select>
  );
};
