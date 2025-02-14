"use client";
import { useModalStore } from "@/store/ModalStore";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  DateInput,
  DateValue,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { SelectState } from "../select/SelectState";
import { SelectPackage } from "../select/SelectPackage";
import { SelectLanguage } from "../select/SelectLanguage";
import SelectRole from "../select/SelectRole";
import { GetUser, InsertUsers } from "@/actions/user.action";
import { toast } from "react-toastify";
import { Contries } from "@/data/countries";

export interface StateFormUser {
  id?: string;
  firstname: string;
  lastname: string;
  address: string;
  email?: string;
  phone?: string;
  code: string;
  photo: string;
  stateId: string;
  discount: string;
  packageId: string;
  birthday: DateValue;
  languageId: string;
  roleId: string;
}
export const UserForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<StateFormUser>({
    defaultValues: {
      discount: "0",
    },
  });
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();
  const value = watch("stateId");

  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetUser(idItem);
        setValue("id", resp.profileId);
        setValue("firstname", resp.firstname);
        setValue("lastname", resp.lastname);
        setValue("address", resp.address);
        setValue("stateId", resp.stateId);
        setValue("stateId", resp.stateId);
        setValue("discount", resp.discount);
        setValue("packageId", resp.packageId);
        setValue("languageId", resp.languageId);
        setValue("roleId", resp.roleId);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: StateFormUser) => {
    setLoading(true);

    let date = "";
    if (state.birthday) {
      date = new Date(
        state.birthday.year,
        state.birthday.month - 1,
        state.birthday.day
      )
        .toISOString()
        .split("T")[0];
    }
    
    try {
      state.photo =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s";
      
      state.code = state.code ? state.code.replace("+", ""):"";
      const resp = await InsertUsers(state, date);
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
      console.log(error);
      toast.error("Ha ocurrido un error inesperado", {
        position: "top-right",
      });
    }
    setLoading(false);
  };
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
      onSubmit={handleSubmit(OnSubmit)}
    >
      <Input
        type="text"
        label="Nombre"
        placeholder="Ingrese nombre"
        {...register("firstname", { required: "El campo es requerido" })}
        value={watch("firstname")}
        isInvalid={!!errors.firstname}
        errorMessage={errors.firstname?.message}
      />
      <Input
        type="text"
        label="Apellido"
        placeholder="Ingrese apellido"
        {...register("lastname", { required: "El campo es requerido" })}
        value={watch("lastname")}
        isInvalid={!!errors.lastname}
        errorMessage={errors.lastname?.message}
      />
      <Input
        type="text"
        label="Direccion"
        placeholder="Ingrese Direccion"
        {...register("address", { required: "El campo es requerido" })}
        value={watch("address")}
        isInvalid={!!errors.address}
        errorMessage={errors.address?.message}
      />
      {!idItem && (
        <>
          <Input
            type="email"
            label="email"
            placeholder="Ingrese Email"
            {...register("email", {
              required: "El campo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Debe ingresar un email válido",
              },
            })}
            value={watch("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <div className="grid grid-cols-3">
            <Controller
              name="code"
              control={control}
              rules={{ required: "El campo es requerido" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  defaultItems={Contries}
                  label="Code"
                  placeholder="+"
                  errorMessage={errors.code?.message}
                  isInvalid={!!errors.code}
                  onInputChange={(value) => field.onChange(value)}
                >
                  {(item) => (
                    <AutocompleteItem
                      key={item.key}
                      value={item.code}
                      startContent={
                        <Avatar
                          alt={item.code}
                          className="w-6 h-6"
                          src={item.image}
                        />
                      }
                    >
                      {item.code}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Input
              type="text"
              label="Celular"
              className="col-span-2"
              placeholder="Ingrese celular"
              {...register("phone", {
                required: "El campo es requerido",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Solo se permiten números",
                },
              })}
              value={watch("phone")}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
            />
          </div>
        </>
      )}
      {!idItem && (
        <Controller
          name="birthday"
          control={control}
          rules={{ required: "La fecha de nacimiento es requerida" }}
          render={({ field }) => (
            <DateInput
              {...field}
              label={"Fecha Nacimiento"}
              isInvalid={!!errors.birthday}
              errorMessage={errors.birthday?.message}
            />
          )}
        />
      )}

      <SelectState name="stateId" register={register} errors={errors.stateId}  value={value} />
      <SelectPackage register={register} errors={errors} watch={watch} />
      <SelectLanguage register={register} errors={errors} watch={watch} />
      <SelectRole register={register} errors={errors} watch={watch} />
      <Input
        type="number"
        label="Descuento"
        className="col-span-2"
        placeholder="Ingrese descuento"
        {...register("discount")}
        value={watch("discount")}
        isInvalid={!!errors.phone}
        errorMessage={errors.phone?.message}
      />
      <CotentButtonForm state={loading} />
    </form>
  );
};
