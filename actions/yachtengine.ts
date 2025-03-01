"use server";

import { YachtEngine } from "@/interfaces/yacht-engine";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListYachtEngine = async () => {
  const supabase = await createClient();

  const { data: yachtEngine } = await supabase.from("motorYacht").select("*").eq("state", true);
  return yachtEngine as YachtEngine[];
};

export const InsertYachtEngine = async (name: string, id?: string) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("motorYacht")
      .update({ name: name })
      .eq("motorYachtId", id)
      .select();
  } else {
    response = await supabase
      .from("motorYacht")
      .insert([{ name: name }])
      .select();
  }
  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/yachtEngine");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetYachtEngine = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("motorYacht")
    .select("*")
    .eq("motorYachtId", id);
  if (error) {
    return {} as YachtEngine;
  }

  return data?.[0] as YachtEngine;
};
export const DeleteYachtEngine = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("motorYacht")
    .update({ state: false })
    .eq("motorYachtId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/yachtEngine");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};
