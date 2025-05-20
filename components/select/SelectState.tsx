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
import { State } from "@/interfaces/state-interfaces";
import { Autocomplete, AutocompleteItem, Progress, } from "@nextui-org/react";
import { SelectStore } from "@/store/SelectStore";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldError;
  // watch: UseFormWatch<T>;
  name: Path<T>;
  value: PathValue<T, Path<T>>;
  state: State[];
  control:Control<T>;
}

export const SelectState = <T extends FieldValues>({
  errors,
  name,
  value,
  state,
  control
}: Props<T>) => {
  const [data, setdata] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const { idCountry, setState } = SelectStore();

  useEffect(() => {
    const GetCountry = async () => {
      setState(value);
      setLoading(true);
      
      setTimeout(() => {
        if (idCountry) {
          const resp = state.filter((item) => item.countryId === idCountry);
           setdata(resp);
        }else {
          setdata(state);
        }
        setLoading(false);
      }, 50);

      // const resp = await GetStateActive(idCountry);

    };

    GetCountry();
  }, [value, idCountry]);

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
      rules={{ required: "El Estado es requerido" }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          defaultItems={data}
          label="Estado"
          className="w-full"
          placeholder="selecciona el Estado"
          selectedKey={field.value}
          onSelectionChange={(key) => {
            field.onChange(key);
            // console.log(key)
          }}
          isInvalid={!!errors}
          errorMessage={errors?.message}
        >
          {(item) => (
            <AutocompleteItem key={item.stateId}>
              {item.name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    />
  );
};




  // <Select
  //     items={data}
  //     label="Estado"
  //     placeholder="Seleccione Estado"
  //     {...register(name, { required: "El Estado es requerido" })}
  //     isInvalid={!!errors}
  //     errorMessage={errors?.message}
  //   >
  //     {(animal) => <SelectItem key={animal.stateId}>{animal.name}</SelectItem>}
  //   </Select>