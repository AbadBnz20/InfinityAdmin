"use server";

import { Position } from "@/interfaces/position-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListPositions = async () => {
  const supabase = await createClient();
  const { data: position } = await supabase
    .from("position")
    .select(`*`)
    .eq("state", true);
  return position as Position[];
};

export const InsertPosition = async (
  name: string,
  description: string,
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("position")
      .update({ name: name, description: description })
      .eq("IdPosition", id)
      .select();
  } else {
    response = await supabase
      .from("position")
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

  revalidatePath("/position");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetSPosition = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("position")
    .select("*")
    .eq("IdPosition", id)
    .single();
  if (error) {
    return {} as Position;
  }

  return data as Position;
};


export const DeletePosition = async (id: string) => {
    const supabase = await createClient();
  
    const { error } = await supabase
      .from("position")
      .update({ state: false })
      .eq("IdPosition", id)
      .select();
  
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  
    revalidatePath("/position");
    return {
      status: true,
      message: "Eliminado correctamente",
    };
  };