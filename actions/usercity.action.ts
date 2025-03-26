'use server';

import { UserCity } from "@/interfaces/userinterfaces-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";


export const ListUsercity = async () => {
  const supabase = await createClient();
  const { data: userCity } = await supabase
    .from("userCity")
    .select(`*, state(name)`)
    .eq("status", true);
    return userCity as UserCity[];
};


export const InsertUserCity = async (
  name: string,
  IdState: string,
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("userCity")
      .update({ name: name, IdState: IdState })
      .eq("IdUserCity", id)
      .select();
  } else {
    response = await supabase
      .from("userCity")
      .insert([{ name: name, IdState: IdState }])
      .select();
  }
  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/usercity");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetSUserCity = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("userCity")
    .select("*")
    .eq("IdUserCity", id)
    .single();
  if (error) {
    return {} as UserCity;
  }

  return data as UserCity;
};



export const DeleteUserCity = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("userCity")
    .update({ status: false })
    .eq("IdUserCity", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/usercity");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};