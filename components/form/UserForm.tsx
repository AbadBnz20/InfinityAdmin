"use client";
import { useModalStore } from "@/store/ModalStore";
import {
  Checkbox,
  DatePicker,
  DateValue,
  Input,
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

import { getLocalTimeZone, now, parseDate } from "@internationalized/date";
import { SelectCity } from "../select/SelectCity";
import { SelectCountry } from "../select/SelectCountry";
import { SelectStatusWallet } from "../select/SelectStatusWallet";
import { Countries } from "@/interfaces/countries-interfaces";
import { State } from "@/interfaces/state-interfaces";
import { City } from "@/interfaces/city-interfaces";
import { Packages } from "@/interfaces/package-interfaces";
import { Languages } from "@/interfaces/languages-interfaces";
import { SelectCodeProfile } from "../select/SelectCodeProfile";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Contries } from "@/data/countries";
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
  email: string;
  code: string;
  phone: string;
  coCode: string;
  coOwnerTelephone: string;
  photo: string;
  stateId: string;
  discount: string;
  packageId: string;
  birthday: DateValue;
  languageId: string;
}

export interface Props {
  countries: Countries[];
  states: State[];
  cities: City[];
  packages: Packages[];
  languages: Languages[];
}

export const UserForm = ({
  countries,
  states,
  cities,
  packages,
  languages,
}: Props) => {
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

        // console.log(resp);
        setValue("id", resp.profileId);

        const phoneNumber = parsePhoneNumberFromString(`+${resp.phone}`);
        const code = Contries.find(
          (x) => x.code === `+${phoneNumber?.countryCallingCode}`
        );
        if (code) {
          setValue("code", code?.key);
        }
        const coPhoneNumber = parsePhoneNumberFromString(
          `+${resp.coOwnerTelephone}`
        );
        const coCode = Contries.find(
          (x) => x.code === `+${coPhoneNumber?.countryCallingCode}`
        );
        if (coCode) {
          setValue("coCode", coCode?.key);
        }
        setValue("coOwnerTelephone", coPhoneNumber?.nationalNumber || "");
        setValue("phone", phoneNumber?.nationalNumber || "");
        setValue("email", resp.email);
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
        setValue("IdCountry", resp.IdCountry);
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

  const SeachCode = (code: string) => {
    const codeNumber = Contries.find((x) => x.key === code);
    const codeNumberSplit = codeNumber?.code.split("+")[1];
    return codeNumberSplit;
  };

  const OnSubmit = async (state: StateFormUser) => {
    setLoading(true);
    console.log(state);
    const birthday = state.birthday.toDate(getLocalTimeZone()).toISOString();
    const DateSold = state.DateSold.toDate(getLocalTimeZone()).toISOString();
    const Expiration =
      state.Expiration.toDate(getLocalTimeZone()).toISOString();

    const codeNumber = SeachCode(state.code);
    state.phone = `${codeNumber}${state.phone.trim()}`;
    const coCodeNumber = SeachCode(state.coCode);
    state.coOwnerTelephone = `${coCodeNumber}${state.coOwnerTelephone.trim()}`;

    try {
      state.photo =
        "https://res.cloudinary.com/devz7obre/image/upload/v1743004842/pngtree-user-profile-avatar-vector-admin-png-image_5289693_szfiow.png";

      const resp = await InsertUsers(state, birthday, DateSold, Expiration);
      if (!resp.status) {
        onClose();
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      if (state.sendEmail) {
        const language =
          state.languageId === "3fbff8d6-c2e2-476d-99f4-ebf47b2797cd"
            ? "en"
            : "es";

        const res = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: `${state.firstname} ${state.lastname}`,
            email: state.email,
            language: language,
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
    <>
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
              granularity="day"
              showMonthAndYearPickers
              defaultValue={now(getLocalTimeZone())}
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
              showMonthAndYearPickers
              isInvalid={!!errors.Expiration}
              errorMessage={errors.Expiration?.message}
            />
          )}
        />

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
        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <SelectCodeProfile
              name="code"
              watch={watch}
              errors={errors}
              control={control}
            />
          </div>
          <Input
            type="number"
            label="Celular"
            classNames={{
              inputWrapper: "rounded-none  rounded-br-md rounded-tr-md",
            }}
            className={`col-span-3`}
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

        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <SelectCodeProfile
              name="coCode"
              watch={watch}
              errors={errors}
              control={control}
            />
          </div>
          <Input
            type="number"
            label="Celular Co-Titular"
            classNames={{
              inputWrapper: "rounded-none  rounded-br-md rounded-tr-md",
            }}
            className={`col-span-3`}
            placeholder="Ingrese celular"
            {...register("coOwnerTelephone", {
              required: "El campo es requerido",
              pattern: {
                value: /^[0-9]+$/,
                message: "Solo se permiten números",
              },
            })}
            value={watch("coOwnerTelephone")}
            isInvalid={!!errors.coOwnerTelephone}
            errorMessage={errors.coOwnerTelephone?.message}
          />
        </div>

        <Controller
          name="birthday"
          control={control}
          rules={{ required: "La fecha de nacimiento es requerida" }}
          render={({ field }) => (
            <DatePicker
              {...field}
              showMonthAndYearPickers
              label={"Fecha Nacimiento"}
              isInvalid={!!errors.birthday}
              errorMessage={errors.birthday?.message}
            />
          )}
        />

        <SelectCountry
          control={control}
          countries={countries}
          register={register}
          errors={errors.IdCountry}
          name="IdCountry"
          value={valuecountry}
        />

        <SelectState
          control={control}
          state={states}
          name="stateId"
          register={register}
          errors={errors.stateId}
          value={value}
        />

        <SelectCity
          cities={cities}
          control={control}
          name="IdCity"
          error={errors.IdCity}
          value={valuecity}
        />
        <SelectPackage
          packages={packages}
          register={register}
          errors={errors}
          watch={watch}
        />
        <SelectLanguage
          languages={languages}
          register={register}
          errors={errors}
          watch={watch}
        />

        {/* <Input
        type="text"
        label="Estado billetera"
        placeholder="Ingrese estado"
        {...register("StatusWallet", { required: "El campo es requerido" })}
        value={watch("StatusWallet")}
        isInvalid={!!errors.StatusWallet}
        errorMessage={errors.StatusWallet?.message}
      /> */}

        <SelectStatusWallet register={register} errors={errors} watch={watch} />

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
    </>
  );
};
