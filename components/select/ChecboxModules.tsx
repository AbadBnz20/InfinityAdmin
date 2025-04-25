"use client";
import { ListModules } from "@/actions/modules.action";
import { Modules } from "@/interfaces/module-interfaces";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ModulePermissions, StateFormRole } from "../form/RolesForm";

interface Props {
  setValue: UseFormSetValue<StateFormRole>;
  append: UseFieldArrayAppend<StateFormRole, "permissions">;
  fields: FieldArrayWithId<StateFormRole, "permissions", "id">[];
  watch: UseFormWatch<StateFormRole>;
  register: UseFormRegister<StateFormRole>;
  permisosGuardados: ModulePermissions[];
}
export const ChecboxModules = ({
  setValue,
  append,
  fields,
  watch,
  register,
  permisosGuardados,
}: Props) => {
  const [date, setDate] = useState<Modules[]>([]);
  const [loading, setLoading] = useState(false);

  const GetModules = async () => {
    setLoading(true);
    const resp = await ListModules();
    console.log(resp.length);
    setDate(resp);
    setLoading(false);
  };
  useEffect(() => {
    GetModules();
  }, []);

  useEffect(() => {
    setValue("permissions", []);
    if (!date.length) return;
  
    const permisosMap = new Map(
      permisosGuardados.map((p) => [p.moduleId, p])
    );
  
    date.forEach((mod) => {
      const permiso = permisosMap.get(mod.moduleid);
  
      append({
        moduleId: mod.moduleid,
        read: permiso?.read ?? false,
        write: permiso?.write ?? false,
        update: permiso?.update ?? false,
        delete: permiso?.delete ?? false,
      });
    });
  }, [date, permisosGuardados]);

  if (loading) {
    return (
      <div className="w-full h-[100px] grid justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Accordion isCompact>
      {fields.map((field, index) => (
        <AccordionItem
          key={field.id}
          aria-label={field.moduleId}
          title={
            date.find((d) => d.moduleid === field.moduleId)?.name ||
            field.moduleId
          }
          subtitle={Object.entries(watch(`permissions.${index}`))
            .filter(([key, value]) => key !== "module" && value)
            .map(([key]) => {
              const labels: Record<string, string> = {
                read: "Ver",
                write: "Registrar",
                update: "Editar",
                delete: "Eliminar",
              };
              return labels[key];
            })
            .join(", ")}
        >
          <div className="m-1 space-x-[1px]">
            <Checkbox
              {...register(`permissions.${index}.read`)}
              isSelected={watch(`permissions.${index}.read`)}
              onValueChange={(value) =>
                setValue(`permissions.${index}.read`, value)
              }
              className="my-1"
            >
              Ver
            </Checkbox>
            <Checkbox
              {...register(`permissions.${index}.write`)}
              isSelected={watch(`permissions.${index}.write`)}
              onValueChange={(value) =>
                setValue(`permissions.${index}.write`, value)
              }
              className="my-1"
            >
              Registrar
            </Checkbox>
            <Checkbox
              {...register(`permissions.${index}.update`)}
              isSelected={watch(`permissions.${index}.update`)}
              onValueChange={(value) =>
                setValue(`permissions.${index}.update`, value)
              }
              className="my-1"
            >
              Editar
            </Checkbox>
            <Checkbox
              {...register(`permissions.${index}.delete`)}
              isSelected={watch(`permissions.${index}.delete`)}
              onValueChange={(value) =>
                setValue(`permissions.${index}.delete`, value)
              }
              className="my-1"
            >
              Eliminar
            </Checkbox>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

//   <CheckboxGroup
//   label="Modulos"
//   value={groupSelected}
//   onChange={setGroupSelected}
// >
//   {date.map((item) => (
//     <Checkbox key={item.moduleid} value={item.moduleid}>
//       {item.name}
//     </Checkbox>
//   ))}

// </CheckboxGroup>
