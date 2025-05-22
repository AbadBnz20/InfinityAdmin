import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { City } from "@/interfaces/city-interfaces";
import { Autocomplete, AutocompleteItem, Progress } from "@nextui-org/react";
import { SelectStore } from "@/store/SelectStore";
import { GetCityActive } from "@/actions/destinationship";

interface Props<T extends FieldValues> {
  control: Control<T, any>;
  name: Path<T>;
  error?: FieldError;
  value: PathValue<T, Path<T>>;
  cities: City[];
}
export const SelectCity = <T extends FieldValues>({
  control,
  name,
  error,
  value,
}: Props<T>) => {
  const [data, setdata] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const { idState } = SelectStore();
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);

      // setTimeout(() => {
      //   if (idState) {
      //     const resp = cities.filter((item) => item.stateId === idState);
      //     setdata(resp);
      //   } else {
      //     setdata(cities);
      //   }
      //   setLoading(false);
      // }, 50);

      const resp = await GetCityActive(idState);
      setdata(resp);
      setLoading(false);
    };

    GetCountry();
  }, [value, idState]);
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
         rules={{ required: "El Ciudad es requerido" }}
         render={({ field }) => (
           <Autocomplete
             {...field}
             defaultItems={data}
             label="Ciudad"
             className="w-full"
             placeholder="selecciona el Ciudad"
             selectedKey={field.value}
             onSelectionChange={(key) => {
               field.onChange(key);
               // console.log(key)
             }}
             isInvalid={!!error}
             errorMessage={error?.message}
           >
             {(item) => (
               <AutocompleteItem key={item.cityId}>
                 {item.name}
               </AutocompleteItem>
             )}
           </Autocomplete>
         )}
       />
  );
};



//  <Controller
//       control={control}
//       name={name}
//       rules={{ required: "La ciudad es requerido" }}
//       render={({ field, fieldState }) => {
//         return (
//           <Select
//             {...field}
//             items={data}
//             label="Ciudad"
//             placeholder="Seleccione Ciudad"
//             isInvalid={fieldState.invalid}
//             defaultSelectedKeys={
//               field.value ? new Set([field.value]) : new Set()
//             }
//             onSelectionChange={(keys) => field.onChange(Array.from(keys).pop())}
//             errorMessage={error?.message}
//           >
//             {(item) => <SelectItem key={item.cityId}>{item.name}</SelectItem>}
//           </Select>
//         );
//       }}
//     />