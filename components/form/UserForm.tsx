"use client";
import { useModalStore } from "@/store/ModalStore";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Checkbox,
  DateInput,
  DatePicker,
  DateValue,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { SelectState } from "../select/SelectState";
import { SelectPackage } from "../select/SelectPackage";
import { SelectLanguage } from "../select/SelectLanguage";
import { GetUser, InsertUsers } from "@/actions/user.action";
import { toast } from "react-toastify";
import { Contries } from "@/data/countries";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { SelectCity } from "../select/SelectCity";
import { SelectCountry } from "../select/SelectCountry";

const data = [
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

export interface StateFormUser {
  id?: string;
  sendEmail: boolean;
  NroContract: string;
  DateSold: DateValue;
  Expiration: DateValue;
  SecondaryEmail: string;
  StatusWallet: string;
  Note: string;
  IdCity: string;
  IdCountry: string;
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
  const valuecity = watch("IdCity");
  const valuecountry = watch("IdCountry");
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
        setValue("discount", resp.discount);
        setValue("IdCity", resp.IdCity);
        setValue("NroContract", resp.NroContract);
        setValue("SecondaryEmail", resp.SecondaryEmail);
        setValue("StatusWallet", resp.StatusWallet);
        setValue("Note", resp.Note);
        setValue("birthday", parseDate(resp.birthdate));
        setValue("DateSold", parseDate(resp.DateSold));
        setValue("Expiration", parseDate(resp.Expiration));
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: StateFormUser) => {
    setLoading(true);
    console.log(state)
    const birthday = state.birthday.toDate(getLocalTimeZone()).toISOString();
    const DateSold = state.DateSold.toDate(getLocalTimeZone()).toISOString();
    const Expiration =
      state.Expiration.toDate(getLocalTimeZone()).toISOString();

    try {
      state.photo =
        "https://res.cloudinary.com/devz7obre/image/upload/v1743004842/pngtree-user-profile-avatar-vector-admin-png-image_5289693_szfiow.png";

      state.code = state.code ? state.code.replace("+", "") : "";
      const resp = await InsertUsers(state, birthday, DateSold, Expiration);
      if (!resp.status) {
        onClose();
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      if (state.sendEmail) {
        const res = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: `${state.firstname} ${state.lastname}`,
            email: state.email,
          }),
        });
        const datafetch = await res.json();
        console.log(datafetch);
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
        label="Numero de Contrato"
        placeholder="Ingrese numero"
        {...register("NroContract", { required: "El campo es requerido" })}
        value={watch("NroContract")}
        isInvalid={!!errors.NroContract}
        errorMessage={errors.NroContract?.message}
      />
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

      <Controller
        name="DateSold"
        control={control}
        rules={{ required: "La fecha de inicio es requerida" }}
        render={({ field }) => (
          <DatePicker
            label="Fecha de inicio"
            {...field}
            isInvalid={!!errors.DateSold}
            errorMessage={errors.DateSold?.message}
          />
        )}
      />
      <Controller
        name="Expiration"
        control={control}
        rules={{ required: "La fecha de expiracion es requerida" }}
        render={({ field }) => (
          <DatePicker
            label="Fecha de Expiracion"
            {...field}
            isInvalid={!!errors.Expiration}
            errorMessage={errors.Expiration?.message}
          />
        )}
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
          <Input
            type="email"
            label="email secundario"
            placeholder="Ingrese Email"
            {...register("SecondaryEmail", {
              required: "El campo es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Debe ingresar un email válido",
              },
            })}
            value={watch("SecondaryEmail")}
            isInvalid={!!errors.SecondaryEmail}
            errorMessage={errors.SecondaryEmail?.message}
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
      <SelectCountry
        register={register}
        errors={errors.IdCountry}
        name="IdCountry"
        value={valuecountry}
      />
      <SelectState
        name="stateId"
        register={register}
        errors={errors.stateId}
        value={value}
      />

      <SelectCity
        control={control}
        name="IdCity"
        error={errors.IdCity}
        value={valuecity}
      />
      <SelectPackage register={register} errors={errors} watch={watch} />
      <SelectLanguage register={register} errors={errors} watch={watch} />

      {/* <Input
        type="text"
        label="Estado billetera"
        placeholder="Ingrese estado"
        {...register("StatusWallet", { required: "El campo es requerido" })}
        value={watch("StatusWallet")}
        isInvalid={!!errors.StatusWallet}
        errorMessage={errors.StatusWallet?.message}
      /> */}

      <Select
        items={data}
        label="Estado billetera"
        placeholder="Seleccione estado"
        {...register("StatusWallet", { required: "El Campo es requerido" })}
        value={watch("StatusWallet")}
        isInvalid={!!errors.StatusWallet}
        errorMessage={errors.StatusWallet?.message}
      >
        {(item) => <SelectItem key={item.idstatus}>{item.name}</SelectItem>}
      </Select>

      <Input
        type="number"
        label="Descuento"
        placeholder="Ingrese descuento"
        {...register("discount", { required: false })}
        value={watch("discount")}
        isInvalid={!!errors.discount}
        errorMessage={errors.discount?.message}
      />
      <Textarea
        label="Nota"
        placeholder="Ingrese nota"
        {...register("Note", { required: "El campo es requerido" })}
        value={watch("Note")}
        className="col-span-2"
        isInvalid={!!errors.Note}
        errorMessage={errors.Note?.message}
      />
      <Checkbox
          {...register("sendEmail")}
          isSelected={watch("sendEmail")} // Asegura que se refleje el cambio
          onValueChange={(value) => setValue("sendEmail", value)}
          className="my-1"
        >
          ¿Deseas enviar el correo de Bienvenida?
        </Checkbox>
      <CotentButtonForm state={loading} />
    </form>
  );
};
