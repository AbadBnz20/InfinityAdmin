import React, { useEffect, useState } from 'react'
import { DestinationForm } from '../form/DestinationForm';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Category } from '@/interfaces/destinations-interfaces';
import { GetCategoryActive } from '@/actions/destinations.action';
import { Progress, Select, SelectItem } from '@nextui-org/react';

interface Props {
  register: UseFormRegister<DestinationForm>;
  errors: FieldErrors<DestinationForm>;
  watch: UseFormWatch<DestinationForm>;
}
export const SelectCategory = ({ register, errors, watch }: Props) => {
    const value = watch("categoryoriginId");
    const [data, setdata] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const GetCountry = async () => {
        setLoading(true);
        const resp = await GetCategoryActive();
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
        label="Categoria"
        placeholder="Seleccione Categoria"
        className="mt-3"
        defaultSelectedKeys={[value]}
        {...register("categoryoriginId", { required: "La Categoria es requerido" })}
        isInvalid={!!errors.categoryoriginId}
        errorMessage={errors.categoryoriginId?.message}
      >
        {(animal) => (
          <SelectItem key={animal.categoryId}>{animal.name}</SelectItem>
        )}
      </Select>
    );
}
