"use server";

import { Attractions } from "@/interfaces/attractions";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListAttractions = async () => {
  const supabase = await createClient();

  const { data: attractions } = await supabase.from("attractions").select("*");
  return attractions as Attractions[];
};

export const InsertAttractions = async (name: string, id?: string) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("attractions")
      .update({ name: name })
      .eq("attractionsId", id)
      .select();
  } else {
    response = await supabase
      .from("attractions")
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

  revalidatePath("/attractions");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetAttractions = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("attractions")
    .select("*")
    .eq("attractionsId", id);
  if (error) {
    return {} as Attractions;
  }

  return data?.[0] as Attractions;
};
export const DeleteAttractions = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("attractions")
    .update({ state: false })
    .eq("attractionsId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/attractions");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};
