"use client";

import { useModalStore } from "@/store/ModalStore";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  DateInput,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Contries } from "@/data/countries";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { SelectState } from "../select/SelectState";
import SelectRole from "../select/SelectRole";
import { SelectCountry } from "../select/SelectCountry";
import { SelectPosition } from "../select/SelectPosition";
import { SelectDepartment } from "../select/SelectDepartment";
import {
  DateValue,
  getLocalTimeZone,
  today,
} from "@internationalized/date";
import { toast } from "react-toastify";
import { InsertAdmin } from "@/actions/admin.action";
import { SelectLocation } from "../select/SelectLocation";

export interface StateFormAdmin {
  id?: string;
  firstname: string;
  lastname: string;
  address: string;
  email?: string;
  phone?: string;
  code: string;
  birthday: string;
  IdRole: string;
  IdState: string;
  IdLocation: string;
  IdCountry: string;
  IdDepartment: string;
  IdPosition: string;
}

export const AdminForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<StateFormAdmin>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();
  const [valueDate, setValueDate] = useState<DateValue | null>(
    today(getLocalTimeZone())
  );
  const value = watch("IdState");
  const valuerole = watch("IdRole");
  const valuecountry = watch("IdCountry");

  const OnSubmit = async (state: StateFormAdmin) => {
    setLoading(true);
    const departureDate = valueDate?.toDate(getLocalTimeZone());
    state.birthday = departureDate?.toISOString() || "";
    state.code = state.code ? state.code.replace("+", "") : "";

    try {
      state.code = state.code ? state.code.replace("+", "") : "";
      const resp = await InsertAdmin(state);
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
                  inputProps={{
                    classNames: {
                      input: "rounded-none rounded-bl-md rounded-br-md",
                      inputWrapper: "rounded-none rounded-bl-md rounded-tl-md",
                    },
                  }}
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
              type="number"
              label="Celular"
              classNames={{
                inputWrapper: "rounded-none  rounded-br-md rounded-tr-md",
              }}
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
      <DateInput
        label="Fecha de Nacimiento"
        value={valueDate}
        onChange={setValueDate}
      />
       <SelectLocation register={register} errors={errors} watch={watch} />
      <SelectCountry
        register={register}
        errors={errors.IdCountry}
        name="IdCountry"
        value={valuecountry}
      />
      <SelectState
        name="IdState"
        register={register}
        errors={errors.IdState}
        value={value}
      />
      <SelectPosition register={register} errors={errors} watch={watch} />
      <SelectDepartment register={register} errors={errors} watch={watch} />
      <SelectRole
        name="IdRole"
        is_admin
        register={register}
        errors={errors.IdRole}
        value={valuerole}
      />

      <CotentButtonForm state={loading} />
    </form>
  );
};
//
