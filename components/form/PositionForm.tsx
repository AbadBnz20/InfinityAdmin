'use client';
import { useModalStore } from '@/store/ModalStore';
import { Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CotentButtonForm } from '../ui/contentButton/CotentButtonForm';
import { GetSPosition, InsertPosition } from '@/actions/position.action';


export interface PositionForm {
    id?: string;
    name: string;
    description: string;
  }

export const PositionForm = () => {
const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PositionForm>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();

  useEffect(() => {
      const GetItem = async () => {
        if (idItem) {
          const resp = await GetSPosition(idItem);
          setValue("id", resp.IdPosition);
          setValue("name", resp.name);
          setValue("description", resp.description);
        }
      };
  
      GetItem();
    }, [idItem]);



 const OnSubmit = async (state: PositionForm) => {
    setLoading(true);
    try {
      const resp = await InsertPosition(state.name,state.description,state.id);
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
