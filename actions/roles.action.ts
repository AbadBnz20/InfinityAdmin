"use server";

import { Role } from "@/interfaces/roles-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { InsertModule } from "./modules.action";

export const ListRoles = async () => {
      const supabase = await createClient();
  
  const { data: roles } = await supabase.from("role").select(`
    *,
    permissions(
      *,
      modules(name)
    )
  `).eq("state", true);
  return roles as Role[];
};

type action = "register" | "update" | "delete";
export const InsertRole = async (
  name: string,
  modules: string[],
  is_admin:boolean,
  action: action[],
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("role")
      .update({ name: name,is_admin:is_admin })
      .eq("roleId", id)
      .select();
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
      .insert([{ name: name,is_admin:is_admin }])
      .select();
  }
  const { data, error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  await InsertModule(data[0].roleId, modules, action);

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
    permissions(
      *,
      modules(name)
    )
  `
    )
    .eq("roleId", id).single();
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
