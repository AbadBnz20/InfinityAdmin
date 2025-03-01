'use server';
import { State } from "@/interfaces/state-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListStates = async () => {
    const supabase = await createClient();
  
  const { data: state } = await supabase.from("state").select(`
      *,
      country (
        name
      )
    `).eq("state", true);
  return state as State[];
};

export const InsertState = async (
  name: string,
  idcountry: string,
  id?: string
) => {
  const supabase = await createClient();

  let response;
  if (id) {
    response = await supabase
      .from("state")
      .update({ name: name, countryId: idcountry })
      .eq("stateId", id)
      .select();
  } else {
    response = await supabase
      .from("state")
      .insert([{ name: name, countryId: idcountry }])
      .select();
  }
  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/states");
  return {
    status: true,
    message: id ? "Actualizado correctamente" : "Guardado correctamente",
  };
};

export const GetState = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("state")
    .select("*")
    .eq("stateId", id);
  if (error) {
    return {} as State;
  }

  return data?.[0] as State;
};


export const DeleteState = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("state")
    .update({ state: false })
    .eq("stateId", id)
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