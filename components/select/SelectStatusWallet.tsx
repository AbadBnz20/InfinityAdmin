import React, { useEffect, useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { StateFormUser } from '../form/UserForm';
import { Progress, Select, SelectItem } from '@nextui-org/react';

interface Packages {
    idstatus: string;
    name: string;
}


const StatusWallet = [
  {
    idstatus: "Activo",
    name: "Activo",
  },
  {
    idstatus: "Inactivo",
    name: "Inactivo",
  },
  {
    idstatus: "Suspendido",
    name: "Suspendido",
  },
  {
    idstatus: "Bloqueado",
    name: "Bloqueado",
  },
  {
    idstatus: "Eliminado",
    name: "Eliminado",
  },
];
interface Props {
    register: UseFormRegister<StateFormUser>;
    errors: FieldErrors<StateFormUser>;
    watch: UseFormWatch<StateFormUser>;
  }

export const SelectStatusWallet = ({ register, errors,watch }: Props) => {
    const value = watch("StatusWallet");
    const [data, setdata] = useState<Packages[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const GetCountry = async () => {
          setLoading(true); // Activa el estado de carga
          setTimeout(() => {
            setdata(StatusWallet); // Simula la carga de datos
            setLoading(false); // Desactiva el estado de carga después de 1 segundo
          }, 1000); // Tiempo de espera de 1 segundo
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
    label="Estado Billetera"
    placeholder="Seleccione Estado"
    {...register("StatusWallet", { required: "El Estado es requerido" })}
    isInvalid={!!errors.StatusWallet}
    errorMessage={errors.StatusWallet?.message}
  >
    {(item) =>  <SelectItem key={item.idstatus}>{item.name}</SelectItem>}
  </Select>
  )
}
