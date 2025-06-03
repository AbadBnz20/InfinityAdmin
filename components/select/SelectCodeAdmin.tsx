


import React, { useEffect, useState } from 'react'
import { StateFormAdmin } from '../form/AdminForm';
import { Control, Controller, FieldErrors, Path, UseFormWatch } from 'react-hook-form';
import { Contries } from '@/data/countries';
import { Autocomplete, AutocompleteItem, Avatar, Progress } from '@nextui-org/react';


interface CountryCodes {
  image: string;
  code: string;
  key: string;
}


interface Props {
  errors: FieldErrors<StateFormAdmin>;
  watch: UseFormWatch<StateFormAdmin>;
  control: Control<StateFormAdmin>;
  name: Path<StateFormAdmin>;
}

export const SelectCodeAdmin = ({ name, watch, errors, control }: Props) => {
    const value = watch(name);
      const [data, setdata] = useState<CountryCodes[]>([]);
      const [loading, setLoading] = useState(false);
      useEffect(() => {
        const GetCountry = async () => {
          setLoading(true);
          setTimeout(() => {
            setdata(Contries);
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
      rules={{ required: "El Código es requerido" }}
      render={({ field }) => (
        <Autocomplete
          items={data}
          label="Código"
          className="w-full"
          inputProps={{
            classNames: {
              input: "rounded-none rounded-bl-md rounded-br-md",
              inputWrapper: "rounded-none rounded-bl-md rounded-tl-md",
            },
          }}
          placeholder="+"
          selectedKey={
            typeof field.value === "string" || typeof field.value === "number"
              ? field.value
              : undefined
          }
          onSelectionChange={(key) => {
            field.onChange(key);
            // console.log(key)
          }}
          isInvalid={!!errors.code}
          errorMessage={errors.code?.message}
        >
          {(item) => (
            <AutocompleteItem
              key={item.key}
              startContent={
                <Avatar alt={item.code} className="w-6 h-6" src={item.image} />
              }
            >
              {item.code}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}
    />
  )
}
