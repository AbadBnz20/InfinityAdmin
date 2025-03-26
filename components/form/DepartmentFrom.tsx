'use client';


import { GetSDepartment, InsertDepartment } from '@/actions/departaments.action';

import { useModalStore } from '@/store/ModalStore';
import { Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CotentButtonForm } from '../ui/contentButton/CotentButtonForm';

export interface DepartmentForm {
    id?: string;
    name: string;
    description: string;
  }


export const DepartmentFrom = () => {

const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DepartmentForm>();

const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();

  useEffect(() => {
      const GetItem = async () => {
        if (idItem) {
          const resp = await GetSDepartment(idItem);
          setValue("id", resp.IdDepartment);
          setValue("name", resp.name);
          setValue("description", resp.description);
        }
      };
  
      GetItem();
    }, [idItem]);

const OnSubmit = async (state: DepartmentForm) => {
    setLoading(true);
    try {
      const resp = await InsertDepartment(state.name,state.description,state.id);
      if (!resp.status) {
        onClose();
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      onClose();
      toast.success(resp.message, {
        position: "top-right",
      });
    } catch (error) {
      console.log(error)
      toast.error("Ha ocurrido un error inesperado", {
        position: "top-right",
      });
    }
    setLoading(false);
  };



  return (
    <form  onSubmit={handleSubmit(OnSubmit)}>
      <Input
        type="text"
        label="Nombre"
        placeholder="Ingrese nombre"
        {...register("name", { required: "El campo es requerido" })}
        value={watch("name")}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
        <Input
        className='mt-3'
        type="text"
        label="Descripcion"
        placeholder="Ingrese descripcion"
        {...register("description", { required: "El campo es requerido" })}
        value={watch("description")}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
      />

      <CotentButtonForm state={loading} />
    </form>
  )
}
