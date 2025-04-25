"use server";

import { Role } from "@/interfaces/roles-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { InsertModule } from "./modules.action";
import { ModulePermissions } from "@/components/form/RolesForm";

export const ListRoles = async () => {
  const supabase = await createClient();

  const { data: roles } = await supabase
    .from("role")
    .select(
      `
    *,
    permissions(
      *,
      modules(name)
    )
  `
    )
    .eq("state", true);
  return roles as Role[];
};

export type ModulePermissionsInser = {
  roleId: string;
  moduleId: string;
  read: boolean;
  write: boolean;
  update: boolean;
  delete: boolean;
};

export const InsertRole = async (
  name: string,
  permissions: ModulePermissions[],
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("role")
      .update({ name: name })
      .eq("roleId", id)
      .select("roleId")
      .single();
    if (!response.error) {
      const roleId = id;

      const { error: deleteError } = await supabase
        .from("permissions")
        .delete()
        .eq("roleId", roleId);
    }
  } else {
    response = await supabase
      .from("role")
      .insert([{ name: name }])
      .select("roleId")
      .single();
  }
  const { data, error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  const roleId = data.roleId;
  const permissionRole: ModulePermissionsInser[] = permissions.map((item) => ({
    roleId: roleId,
    moduleId: item.moduleId,
    read: item.read,
    write: item.write,
    update: item.update,
    delete: item.delete,
  }));

  await InsertModule(permissionRole);

  revalidatePath("/roles");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetRole = async (id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("role")
    .select(
      `
    *,
    permissions(read, write, update, delete,moduleId)
  `
    )
    .eq("roleId", id)
    .single();
  if (error) {
    return {} as Role;
  }

  return data as Role;
};

export const DeleteRole = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("role")
    .update({ state: false })
    .eq("roleId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/roles");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};
