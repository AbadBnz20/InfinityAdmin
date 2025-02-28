import React, { useEffect, useState } from "react";
import { Control, Controller, FieldError, FieldValues, Path, PathValue } from "react-hook-form";
import { City } from "@/interfaces/city-interfaces";
import { Progress, Select, SelectItem } from "@nextui-org/react";
import { GetCityActive } from "@/actions/destinationship";

interface Props<T extends FieldValues> {
  control: Control<T, any>;
  name: Path<T>;
  error?: FieldError;
   value: PathValue<T, Path<T>>;
}
export const SelectCity = <T extends FieldValues>({ control,name,error,value }: Props<T>) => {
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
    <Controller
      control={control}
      name={name}
      rules={{ required: "La ciudad es requerido" }}
      render={({ field, fieldState }) => {
        return (
          <Select
          {...field}
          items={data}
          label="Ciudad"
          placeholder="Seleccione Ciudad"
          isInvalid={fieldState.invalid}
          defaultSelectedKeys={field.value ? new Set([field.value]) : new Set()}
          onSelectionChange={(keys) => field.onChange(Array.from(keys).pop())}
          errorMessage={error?.message}
        >
          {(item) => <SelectItem key={item.cityId}>{item.name}</SelectItem>}
        </Select>
        );
      }}
    />
  );
};


