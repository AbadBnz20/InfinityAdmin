
import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { StateFormAdmin } from "../form/AdminForm";
import { Department } from "@/interfaces/departments-interfaces";
import { Progress, Select, SelectItem } from "@nextui-org/react";
interface Props {
  register: UseFormRegister<StateFormAdmin>;
  errors: FieldErrors<StateFormAdmin>;
  watch: UseFormWatch<StateFormAdmin>;
  departaments: Department[];
}

export const SelectDepartment = ({ register, errors, watch,departaments }: Props) => {
  const value = watch("IdDepartment");
  const [data, setdata] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);

      setTimeout(() => {
        setdata(departaments);
        setLoading(false);
      }, 50);
      // const resp = await ListDepartaments();
      // setdata(resp);
      // setLoading(false);
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
      label="Departamento"
      placeholder="Seleccione Departamento"
      {...register("IdDepartment", {
        required: "El Departamento es requerido",
      })}
      isInvalid={!!errors.IdDepartment}
      errorMessage={errors.IdDepartment?.message}
    >
      {(item) => <SelectItem key={item.IdDepartment}>{item.name}</SelectItem>}
    </Select>
  );
};
