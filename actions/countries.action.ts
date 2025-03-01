"use server";
import { Countries } from "@/interfaces/countries-interfaces";
import { createClient } from "../utils/server";
import { revalidatePath } from "next/cache";

export const ListCountries = async () => {
      const supabase = await createClient();
  
  const { data: country } = await supabase.from("country").select("*").eq("state", true);
  return country as Countries[];
};

export const InsertCountry = async (name: string, id?: string) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("country")
      .update({ name: name })
      .eq("countryId", id)
      .select();
  } else {
    response = await supabase
      .from("country")
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

  revalidatePath("/countries");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};
export const GetCountry = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("country")
    .select("*")
    .eq("countryId", id);
  if (error) {
    return {} as Countries;
  }

  return data?.[0] as Countries;
};

export const DeleteCountry = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("country")
    .update({ state: false })
    .eq("countryId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/countries");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};

export const GetCountryActive = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("country")
    .select("*")
    .eq("state", true);
  if (error) {
    return [];
  }

  return data as Countries[];
};