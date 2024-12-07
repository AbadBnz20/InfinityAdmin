'use server';

import { Role } from "@/interfaces/roles-interfaces";
import { supabase } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListRoles = async () => {
  const { data: country } = await supabase.from("role").select("*");
    return country as Role[];
  };
  export const InsertRole = async (
    name: string,
    id?: string
  ) => {
    let response;
    if (id) {
      response = await supabase
        .from("role")
        .update({ name: name })
        .eq("roleId", id)
        .select();
    } else {
      response = await supabase
        .from("role")
        .insert([{ name: name}])
        .select();
    }
    const { error } = response;
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  
    revalidatePath("/roles");
    return {
      status: true,
      message: id ? "Actualizado correctamente" : "Guardado correctamente",
    };
  };

  
export const GetRole = async (id: string) => {
  const { data, error } = await supabase
      .from("role")
      .select("*")
      .eq("roleId", id);
    if (error) {
      return {} as Role;
    }
  
    return data?.[0] as Role;
  };


  export const DeleteRole = async (id: string) => {
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