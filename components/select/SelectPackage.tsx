import React, { useEffect, useState } from 'react'
import { StateFormUser } from '../form/UserForm';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Packages } from '@/interfaces/package-interfaces';
import { Progress, Select, SelectItem } from '@nextui-org/react';
import { GetPackageActive } from '@/actions/user.action';
interface Props {
    register: UseFormRegister<StateFormUser>;
    errors: FieldErrors<StateFormUser>;
    watch: UseFormWatch<StateFormUser>;
  }
export const SelectPackage = ({ register, errors,watch }: Props) => {
    const value = watch("packageId");
    const [data, setdata] = useState<Packages[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const GetCountry = async () => {
        setLoading(true);
        const resp = await GetPackageActive();
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
    label="Paquete"
    placeholder="Seleccione Paquete"
    {...register("packageId", { required: "El Paquete es requerido" })}
    isInvalid={!!errors.stateId}
    errorMessage={errors.stateId?.message}
  >
    {(item) => (
      <SelectItem key={item.packageId}>{`${item.name} (${item.percentage}%)`}</SelectItem>
    )}
  </Select>
  )
}
