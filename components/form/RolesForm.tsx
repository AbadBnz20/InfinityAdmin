"use client";

import { GetRole, InsertRole } from "@/actions/roles.action";
import { useModalStore } from "@/store/ModalStore";
import { Checkbox, CheckboxGroup, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CotentButtonForm } from "../ui/contentButton/CotentButtonForm";
import { ChecboxModules } from "../select/ChecboxModules";

export interface StateForm {
  id?: string;
  name: string;
  is_admin: boolean;
}
type action = "register" | "update" | "delete";
export const RolesForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StateForm>();
  const [loading, setLoading] = useState(false);
  const { onClose, idItem } = useModalStore();
  const [groupSelected, setGroupSelected] = useState<string[]>([]);
  const [actionSelected, setactionSelected] = useState<action[]>([]);

  useEffect(() => {
    const GetItem = async () => {
      if (idItem) {
        const resp = await GetRole(idItem);
        setGroupSelected(resp.permissions.map((item) => item.moduleId));
        if (resp.permissions.length > 0) {
          const selectedActions: action[] = [];
          if (resp.permissions[0].delete) {
            selectedActions.push("delete");
          }
          if (resp.permissions[0].update) {
            selectedActions.push("update");
          }
          if (resp.permissions[0].write) {
            selectedActions.push("register");
          }
          setactionSelected(selectedActions);
        }

        setValue("id", resp.roleId);
        setValue("name", resp.name);
        setValue("is_admin", resp.is_admin);
      }
    };

    GetItem();
  }, [idItem]);

  const OnSubmit = async (state: StateForm) => {
    setLoading(true);
    console.log(state);
    // if (groupSelected.length === 0) {
    //   setLoading(false);
    //   return toast.error("Seleccione un modulo", {
    //     position: "top-right",
    //   });
    // }

    try {
      const resp = await InsertRole(
        state.name,
        groupSelected,
        state.is_admin,
        actionSelected,
        state.id
      );
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

  const handleActionChange = (value: string[]) => {
    setactionSelected(value as action[]);
  };

  return (
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
      <div>
        <Checkbox
          {...register("is_admin")}
          isSelected={watch("is_admin")} // Asegura que se refleje el cambio
          onValueChange={(value) => setValue("is_admin", value)}
          className="my-1"
        >
          ¿Este Rol es administrador?
        </Checkbox>
      </div>
      <div className="grid grid-cols-2 mt-3">
        <ChecboxModules
          groupSelected={groupSelected}
          setGroupSelected={setGroupSelected}
        />
        <CheckboxGroup
          value={actionSelected}
          onChange={handleActionChange}
          label="Acciones"
        >
          <Checkbox value="register">Registrar</Checkbox>
          <Checkbox value="update">Editar</Checkbox>
          <Checkbox value="delete">Eliminar</Checkbox>
        </CheckboxGroup>
      </div>

      <CotentButtonForm state={loading} />
    </form>
  );
};
