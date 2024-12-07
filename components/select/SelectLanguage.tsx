import React, { useEffect, useState } from 'react'
import { StateFormUser } from '../form/UserForm';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { GetLanguagesActive } from '@/actions/user.action';
import { Languages } from '@/interfaces/languages-interfaces';
import { Progress, Select, SelectItem } from '@nextui-org/react';
interface Props {
    register: UseFormRegister<StateFormUser>;
    errors: FieldErrors<StateFormUser>;
    watch: UseFormWatch<StateFormUser>;
  }
export const SelectLanguage = ({ register, errors }: Props) => {
    const [data, setdata] = useState<Languages[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const GetCountry = async () => {
        setLoading(true);
        const resp = await GetLanguagesActive();
        setdata(resp);
        setLoading(false);
      };
  
      GetCountry();
    }, []);
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
      label="Idioma"
      placeholder="Seleccione Idioma"
      {...register("languageId", { required: "El Idioma es requerido" })}
      isInvalid={!!errors.languageId}
      errorMessage={errors.languageId?.message}
    >
      {(animal) => (
        <SelectItem key={animal.languageId}>{animal.name}</SelectItem>
      )}
    </Select>
  )
}
