import React, { useEffect, useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { StateFormUser } from '../form/UserForm';
import { ListUsercity } from '@/actions/usercity.action';
import { UserCity } from '@/interfaces/userinterfaces-interfaces';
import { Progress, Select, SelectItem } from '@nextui-org/react';


interface Props {
    register: UseFormRegister<StateFormUser>;
    errors: FieldErrors<StateFormUser>;
    watch: UseFormWatch<StateFormUser>;
  }

export const SelectCityUser = ({ register, errors,watch }: Props) => {
    const value = watch("IdUserCity");
    const [data, setdata] = useState<UserCity[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const GetCountry = async () => {
        setLoading(true);
        const resp = await ListUsercity();
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
    label="Ciudad"
    placeholder="Seleccione Ciudad"
    {...register("IdUserCity", { required: "El Idioma es requerido" })}
    isInvalid={!!errors.IdUserCity}
    errorMessage={errors.IdUserCity?.message}
  >
    {(item) => (
      <SelectItem key={item.IdUserCity}>{item.name}</SelectItem>
    )}
  </Select>
  )
}
