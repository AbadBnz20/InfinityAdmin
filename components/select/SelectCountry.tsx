import { Countries } from "@/interfaces/countries-interfaces";
import { SelectStore } from "@/store/SelectStore";
import {
  Autocomplete,
  AutocompleteItem,
  Progress,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
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
  countries: Countries[];
  control: Control<T>;
}
export const SelectCountry = <T extends FieldValues>({
  errors,
  name,
  value,
  countries,
  control,
}: Props<T>) => {
  const [data, setdata] = useState<Countries[]>([]);
  const [loading, setLoading] = useState(false);
  const { setCountry } = SelectStore();
  useEffect(() => {
    const GetCountry = async () => {
      setCountry(value);
      setLoading(true);
      // const resp = await GetCountryActive();
      setTimeout(() => {
        setdata(countries);
        setLoading(false);
      }, 50);
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
      name={name}
      control={control}
      rules={{ required: "El Pais es requerido" }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          defaultItems={data}
          label="Pais"
          className="w-full"
          placeholder="selecciona el Pais"
          selectedKey={field.value}
          onSelectionChange={(key) => {
            field.onChange(key);
            // console.log(key)
          }}
          isInvalid={!!errors}
          errorMessage={errors?.message}
        >
          {(item) => (
            <AutocompleteItem key={item.countryId}>
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    />
  );
};

//  <Select
//     items={data}
//     label="Pais"
//     placeholder="Seleccione Pais"
//     {...register(name, { required: "El Pais es requerido" })}
//     isInvalid={!!errors}
//     errorMessage={errors?.message}
//   >
//     {(animal) => (
//       <SelectItem key={animal.countryId}>{animal.name}</SelectItem>
//     )}
//   </Select>
