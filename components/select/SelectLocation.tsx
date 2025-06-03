import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { StateFormAdmin } from "../form/AdminForm";
import { useEffect, useState } from "react";
import { Location } from "@/interfaces/location-interfaces";
import { Progress, Select, SelectItem } from "@nextui-org/react";

interface Props {
  register: UseFormRegister<StateFormAdmin>;
  errors: FieldErrors<StateFormAdmin>;
  watch: UseFormWatch<StateFormAdmin>;
  locations: Location[];
}

export const SelectLocation = ({
  register,
  errors,
  watch,
  locations,
}: Props) => {
  const value = watch("IdLocation");
  const [data, setdata] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);

      setTimeout(() => {
        setdata(locations);
        setLoading(false);
      }, 50);

      // const resp = await ListLocations();
      // setdata(resp);
      // setLoading(false);
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
      label="Locacion"
      placeholder="Seleccione Locacion"
      {...register("IdLocation", { required: "El Puesto es requerido" })}
      isInvalid={!!errors.IdLocation}
      errorMessage={errors.IdLocation?.message}
    >
      {(item) => <SelectItem key={item.IdLocation}>{item.name}</SelectItem>}
    </Select>
  );
};
