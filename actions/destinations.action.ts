"use server";

import { Category, Destination } from "@/interfaces/destinations-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListCategory = async () => {
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("category_origin_destination")
    .select("*").eq("state", true);
  return category as Category[];
};


export const InsertCategory = async (name: string, id?: string) => {
  const supabase = await createClient();
  let response;
  if (id) {
    response = await supabase
      .from("category_origin_destination")
      .update({ name: name })
      .eq("categoryId", id)
      .select();
  } else {
    response = await supabase
      .from("category_origin_destination")
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

  revalidatePath("/category");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetCategory = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("category_origin_destination")
    .select("*")
    .eq("categoryId", id).single();
  if (error) {
    return {} as Category;
  }

  return data as Category;
};

export const DeleteCategory = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("category_origin_destination")
    .update({ state: false })
    .eq("categoryId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/category");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};


export const GetCategoryActive = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("category_origin_destination")
    .select("*")
    .eq("state", true);
  if (error) {
    return [];
  }

  return data as Category[];
};



export const ListDestinations = async () => {
    const supabase = await createClient();
  
  const { data: destinations } = await supabase.from("origin_destination").select(`
      *,
      category_origin_destination (
        name
      )
    `).eq("state", true);

    return destinations as  Destination[];
};


export const InsertDestination = async (
  name: string,
  categoryoriginId: string,
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("origin_destination")
      .update({ name: name, categoryoriginId: categoryoriginId })
      .eq("origindestinationId", id)
      .select();
  } else {
    response = await supabase
      .from("origin_destination")
      .insert([{ name: name, categoryoriginId: categoryoriginId }])
      .select();
  }
  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/destinations");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};


export const GetDestination = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("origin_destination")
    .select("*")
    .eq("origindestinationId", id).single();
  if (error) {
    return {} as Destination;
  }

  return data as Destination;
};


export const DeleteDestination = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("origin_destination")
    .update({ state: false })
    .eq("origindestinationId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/destinations");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};
