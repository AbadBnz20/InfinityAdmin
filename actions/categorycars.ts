"use server";

import { CategoryCars } from "@/interfaces/category-cars";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListCategoryCars = async () => {
  const supabase = await createClient();

  const { data: categoryCars } = await supabase.from("categoryCars").select("*").eq("state", true);
  return categoryCars as CategoryCars[];
};

export const InsertCategoryCars = async (name: string, id?: string) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("categoryCars")
      .update({ name: name })
      .eq("categoryCarId", id)
      .select();
  } else {
    response = await supabase
      .from("categoryCars")
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

  revalidatePath("/categoryCar");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetCategoryCars = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categoryCars")
    .select("*")
    .eq("categoryCarId", id);
  if (error) {
    return {} as CategoryCars;
  }

  return data?.[0] as CategoryCars;
};
export const DeleteCategoryCars = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("categoryCars")
    .update({ state: false })
    .eq("categoryCarId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/categoryCar");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};
