import React, { useEffect, useState } from "react";
import { FieldError, FieldValues, Path, PathValue, UseFormRegister } from "react-hook-form";
import { Role } from "@/interfaces/roles-interfaces";
import { Progress, Select, SelectItem } from "@nextui-org/react";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors?: FieldError;
  name: Path<T>;
  value: PathValue<T, Path<T>>;
  is_admin:boolean,
  roles: Role[];
}
const SelectRole = <T extends FieldValues>({register,
  errors,
  name,
  value,roles }: Props<T>) => {
 
  const [data, setdata] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const GetCountry = async () => {
      setLoading(true);
       setTimeout(() => {
        
        setdata(roles);
        setLoading(false);
      }, 50);
      // const resp = await GetRoleActive();
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
      label="Rol"
      placeholder="Seleccione Rol"
      {...register(name, { required: "El rol es requerido" })}
      isInvalid={!!errors}
      errorMessage={errors?.message}
    >
      {(animal) => <SelectItem key={animal.roleId}>{animal.name}</SelectItem>}
    </Select>
  );
};

export default SelectRole;
