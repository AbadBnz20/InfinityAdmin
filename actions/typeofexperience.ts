"use server";

import { TypeOfExperience } from "@/interfaces/typeofexperience";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListTypeOfExperience = async () => {
  const supabase = await createClient();

  const { data: categoryCars } = await supabase.from("typeOfExperience").select("*").eq("state", true);
  return categoryCars as TypeOfExperience[];
};

export const InsertTypeOfExperience = async (name: string, id?: string) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("typeOfExperience")
      .update({ name: name })
      .eq("typeOfExperienceId", id)
      .select();
  } else {
    response = await supabase
      .from("typeOfExperience")
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

  revalidatePath("/typeOfExperience");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetTypeOfExperience = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("typeOfExperience")
    .select("*")
    .eq("typeOfExperienceId", id);
  if (error) {
    return {} as TypeOfExperience;
  }

  return data?.[0] as TypeOfExperience;
};
export const DeleteTypeOfExperience = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("typeOfExperience")
    .update({ state: false })
    .eq("typeOfExperienceId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/typeOfExperience");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};
