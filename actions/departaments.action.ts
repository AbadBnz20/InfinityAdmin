'use server';

import { Department } from "@/interfaces/departments-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListDepartaments = async () => {
const supabase = await createClient();
  
  const { data: department } = await supabase.from("department").select(`
      * `).eq("state", true);

 return department as Department[];

}


export const InsertDepartment = async (
  name: string,
  description: string,
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("department")
      .update({ name: name, description: description })
      .eq("IdDepartment", id)
      .select();
  } else {
    response = await supabase
      .from("department")
      .insert([{ name: name, description: description }])
      .select();
  }
  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/departments");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};


export const GetSDepartment = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("department")
    .select("*")
    .eq("IdDepartment", id)
    .single();
  if (error) {
    return {} as Department;
  }

  return data as Department;
};


export const DeleteDepartment = async (id: string) => {
    const supabase = await createClient();
    const { error } = await supabase
      .from("department")
      .update({ state: false })
      .eq("IdDepartment", id)
      .select();
  
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  
    revalidatePath("/departments");
    return {
      status: true,
      message: "Eliminado correctamente",
    };
  };