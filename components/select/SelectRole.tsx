import React, { useEffect, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { StateFormUser } from "../form/UserForm";
import { Role } from "@/interfaces/roles-interfaces";
import { GetRoleActive } from "@/actions/user.action";
import { Progress, Select, SelectItem } from "@nextui-org/react";

interface Props {
  register: UseFormRegister<StateFormUser>;
  errors: FieldErrors<StateFormUser>;
  watch: UseFormWatch<StateFormUser>;
}
const SelectRole = ({ register, errors }: Props) => {
  const [data, setdata] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);
      const resp = await GetRoleActive();
      setdata(resp);
      setLoading(false);
    };

    GetCountry();
  }, []);
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
      label="Rol"
      placeholder="Seleccione Rol"
      {...register("roleId", { required: "El rol es requerido" })}
      isInvalid={!!errors.roleId}
      errorMessage={errors.roleId?.message}
    >
      {(animal) => <SelectItem key={animal.roleId}>{animal.name}</SelectItem>}
    </Select>
  );
};

export default SelectRole;
