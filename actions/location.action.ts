"use server";

import { Location } from "@/interfaces/location-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListLocations = async () => {
  const supabase = await createClient();
  const { data: location } = await supabase
    .from("location")
    .select(`*`)
    .eq("state", true);
  return location as Location[];
};

export const InsertLocation = async (
  name: string,
  address: string,
  phone: string,
  city: string,
  country: string,
  codePostal: string,
  rfc: string,
  percentage: string,
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("location")
      .update({
        name: name,
        address: address,
        phone: phone,
        city: city,
        country: country,
        codePostal: codePostal,
        rfc: rfc,
        percentage: +percentage,
      })
      .eq("IdLocation", id)
      .select();
  } else {
    response = await supabase
      .from("location")
      .insert([
        {
          name: name,
          address: address,
          phone: phone,
          city: city,
          country: country,
          codePostal: codePostal,
          rfc: rfc,
          percentage: +percentage,
        },
      ])
      .select();
  }
  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/location");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetLocation = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("location")
    .select("*")
    .eq("IdLocation", id)
    .single();
  if (error) {
    return {} as Location;
  }

  return data as Location;
};

export const DeleteLocation = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("location")
    .update({ state: false })
    .eq("IdLocation", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/location");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};
