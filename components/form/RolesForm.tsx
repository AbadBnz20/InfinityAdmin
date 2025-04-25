"use client";

import { GetRole, InsertRole } from "@/actions/roles.action";
import { useModalStore } from "@/store/ModalStore";
import {  Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { ChecboxModules } from "../select/ChecboxModules";

export type ModulePermissions = {
  moduleId: string;
  read: boolean;
  write: boolean;
  update: boolean;
  delete: boolean;
};

export interface StateFormRole {
  id?: string;
  name: string;
  permissions: ModulePermissions[];
}
export const RolesForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StateFormRole>({
    defaultValues: {
      permissions: [],
    },
  });
  const { fields, append, } = useFieldArray({
    control,
    name: "permissions",
  });

  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();
  const [permissions, setpermissions] = useState<ModulePermissions[]>([]);

  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetRole(idItem);
        if (resp) {
          setpermissions(resp.permissions);
        }
        setValue("id", resp.roleId);
        setValue("name", resp.name);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: StateFormRole) => {
    setLoading(true);
    const filtered = state.permissions.filter((perm) => perm.read);
    try {
      const resp = await InsertRole(state.name, filtered, state.id);
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
    <>
      <form onSubmit={handleSubmit(OnSubmit)}>
        <Input
          type="text"
          label="Nombre"
          placeholder="Ingrese nombre"
          {...register("name", { required: "El campo es requerido" })}
          value={watch("name")}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
        />
        <div className="grid grid-cols-1 mt-3">
          <ChecboxModules
            permisosGuardados={permissions}
            setValue={setValue}
            append={append}
            fields={fields}
            watch={watch}
            register={register}
          />
        </div>
        <CotentButtonForm state={loading} />
      </form>
    </>
  );
};
