"use server";

import { City } from "@/interfaces/city-interfaces";
import { State } from "@/interfaces/state-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListCity = async () => {
  const supabase = await createClient();
  let { data: city, error } = await supabase.from("city").select("*, state (name)").eq("status", true);
 
return city as City[];
};


export const InsertCity = async (
  name: string,
  idstate: string,
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("city")
      .update({ name: name, stateId: idstate })
      .eq("cityId", id)
      .select();
  } else {
    response = await supabase
      .from("city")
      .insert([{ name: name, stateId: idstate }])
      .select();
  }
  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/city");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};



export const GetState = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("city")
    .select("*")
    .eq("cityId", id).single();
  if (error) {
    return {} as City;
  }

  return data as City;
};


export const DeleteCity = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("city")
    .update({ status: false })
    .eq("cityId", id)
    .select();
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/city");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};