"use client";

import { useModalStore } from "@/store/ModalStore";
import {
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import { Contries } from "@/data/countries";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { SelectState } from "../select/SelectState";
import SelectRole from "../select/SelectRole";
import { SelectCountry } from "../select/SelectCountry";
import { SelectPosition } from "../select/SelectPosition";
import { SelectDepartment } from "../select/SelectDepartment";
import { toast } from "react-toastify";
import { GetAdmin, InsertAdmin } from "@/actions/admin.action";
import { SelectLocation } from "../select/SelectLocation";
import { SelectCity } from "../select/SelectCity";
import { Countries } from "@/interfaces/countries-interfaces";
import { State } from "@/interfaces/state-interfaces";
import { City } from "@/interfaces/city-interfaces";
import { ModalAdminRegister } from "../ui/modal/ModalAdminRegister";
import { CountriesFormAdmin } from "./CountriesFormAdmin";
import { GetCountryActive } from "@/actions/countries.action";
import { StateFormAdmin } from "./StateFormAdmin";
import { GetStateActive } from "@/actions/user.action";
import { CityFormAdmin } from "./CityFormAdmin";
import { GetCityActive } from "@/actions/destinationship";
import { SelectCodeAdmin } from "../select/SelectCodeAdmin";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Location } from "@/interfaces/location-interfaces";
import { Position } from "@/interfaces/position-interfaces";
import { Department } from "@/interfaces/departments-interfaces";
import { Role } from "@/interfaces/roles-interfaces";

export interface StateFormAdmin {
  id?: string;
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  phone: string;
  code: string;
  IdRole: string;
  IdState: string;
  IdCity: string;
  IdLocation: string;
  IdCountry: string;
  IdDepartment: string;
  IdPosition: string;
}

interface Props {
   locations: Location[];
    positions: Position[];
     departaments: Department[];
     roles:Role[];
}


export const AdminForm = ({locations,positions,departaments,roles}:Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<StateFormAdmin>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();
  const value = watch("IdState");
  const valuerole = watch("IdRole");
  const valuecountry = watch("IdCountry");
  const valuecity = watch("IdCity");
  const [countriesData, setCountriesData] = useState<Countries[]>([]);
  const [stateData, setStateData] = useState<State[]>([]);
  const [cityData, setCityData] = useState<City[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        handleCountriesChange(),
        handleStateChange(),
        handleCityChange(),
      ]);

      if (idItem) {
        const resp = await GetAdmin(idItem);
        // console.log(resp);

        setValue("id", resp.IdAdmin);
        setValue("firstname", resp.firstName);
        setValue("lastname", resp.lastName);
        setValue("address", resp.address);
        setValue("email", resp.email);

        const phoneNumber = parsePhoneNumberFromString(`+${resp.phone}`);
        const code = Contries.find(
          (x) => x.code === `+${phoneNumber?.countryCallingCode}`
        );
        if (code) {
          setValue("code", code?.key);
        }
        setValue("phone", phoneNumber?.nationalNumber || "");
        setValue("IdCountry", resp.IdCountry);
        setValue("IdState", resp.IdState);
        setValue("IdCity", resp.IdCity);
        setValue("IdLocation", resp.IdLocation);
        setValue("IdPosition", resp.IdPosition);
        setValue("IdDepartment", resp.IdDepartment);
        setValue("IdRole", resp.IdRole);
      }
    };

    fetchData();
    console.log('cambiado')
  }, []);

  const handleCountriesChange = async () => {
    const resp = await GetCountryActive();
    // console.log(resp)
    setCountriesData(resp);
  };

  const handleStateChange = async () => {
    const resp = await GetStateActive();
    // console.log(resp)
    setStateData(resp);
  };

  const handleCityChange = async () => {
    const resp = await GetCityActive();
    // console.log(resp)
    setCityData(resp);
  };


    const SeachCode = (code: string) => {
      const codeNumber = Contries.find((x) => x.key === code);
      const codeNumberSplit = codeNumber?.code.split("+")[1];
      return codeNumberSplit;
    };
  const OnSubmit = async (state: StateFormAdmin) => {
    setLoading(true);
    try {
        const codeNumber = SeachCode(state.code);
      state.code = codeNumber?.replace("+", "") || "";
      console.log(state)


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
          <SelectCodeAdmin
            name="code"
            watch={watch}
            errors={errors}
            control={control}
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
      <SelectLocation locations={locations} register={register} errors={errors} watch={watch} />
      <div>
        <div className="flex items-center">
          <span className="">
            <label className="text-[12px] ">
              Deseas registrar Nuevo pais?{" "}
            </label>
          </span>
          <div>
            <ModalAdminRegister title="Registrar Nuevo País">
              {(onClose) => (
                <CountriesFormAdmin
                  onClose={onClose}
                  handleCountriesChange={handleCountriesChange}
                />
              )}
            </ModalAdminRegister>
          </div>
        </div>
        <SelectCountry
          control={control}
          countries={countriesData}
          register={register}
          errors={errors.IdCountry}
          name="IdCountry"
          value={valuecountry}
        />
      </div>

      <div>
        <div className="flex items-center">
          <span className="">
            <label className="text-[12px] ">
              Deseas registrar Nuevo estado?{" "}
            </label>
          </span>
          <div>
            <ModalAdminRegister title="Registrar Nuevo Estado">
              {(onClose) => (
                <StateFormAdmin
                  onClose={onClose}
                  handleChange={handleStateChange}
                  countries={countriesData}
                />
              )}
            </ModalAdminRegister>
          </div>
        </div>

        <SelectState
          control={control}
          state={stateData}
          name="IdState"
          register={register}
          errors={errors.IdState}
          value={value}
        />
      </div>
      <div>
        <div className="flex items-center">
          <span className="">
            <label className="text-[12px] ">
              Deseas registrar Nuevo ciudad?{" "}
            </label>
          </span>
          <div>
            <ModalAdminRegister title="Registrar Nuevo Ciudad">
              {(onClose) => (
                <CityFormAdmin
                  onClose={onClose}
                  handleChange={handleCityChange}
                  state={stateData}
                />
              )}
            </ModalAdminRegister>
          </div>
        </div>
        <SelectCity
          cities={cityData}
          control={control}
          name="IdCity"
          error={errors.IdCity}
          value={valuecity}
        />
      </div>

      <div className="mt-7">
        <SelectPosition positions={positions} register={register} errors={errors} watch={watch} />
      </div>
      <SelectDepartment departaments={departaments} register={register} errors={errors} watch={watch} />
      <SelectRole
      roles={roles}
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
