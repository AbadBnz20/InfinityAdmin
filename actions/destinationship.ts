"use server";
import { City } from "@/interfaces/city-interfaces";
import { DestinationShip } from "@/interfaces/destinations-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListDestinationShip = async () => {
  const supabase = await createClient();

  const { data: origin_destination_ship, error } = await supabase
    .from("origin_destination_ship")
    .select("*, city(name)");
  return origin_destination_ship as DestinationShip[];
};

export const InsertDestinationShip = async (
  name: string,
  cityId: string,
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("origin_destination_ship")
      .update({ name: name, cityId: cityId })
      .eq("origin_destination_ship_id", id)
      .select();
  } else {
    response = await supabase
      .from("origin_destination_ship")
      .insert([{ name: name, cityId: cityId }])
      .select();
  }
  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/destinationship");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetDestinationShip = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("origin_destination_ship")
    .select("*")
    .eq("origin_destination_ship_id", id)
    .single();
  if (error) {
    return {} as DestinationShip;
  }

  return data as DestinationShip;
};

export const DeleteDestinationShip = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("origin_destination_ship")
    .update({ state: false })
    .eq("origin_destination_ship_id", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/destinationship");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};

export const GetCityActive = async () => {
  const supabase = await createClient();

  const { data: state, error } = await supabase
    .from("city")
    .select("*")
    .eq("status", true);
  if (error) {
    return [];
  }
  return state as City[];
};
