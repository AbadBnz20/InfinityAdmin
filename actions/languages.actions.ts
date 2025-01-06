'use server';
import { Languages } from "@/interfaces/languages-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListLanguages = async () => {
    const supabase = await createClient();
  
  const { data: language } = await supabase
    .from('language')
    .select('*')
   return language as Languages[]
  };

export const InsertLanguages = async (
    name: string,
    id?: string
  ) => {
    const supabase = await createClient();

    let response;
    if (id) {
      response = await supabase
        .from("language")
        .update({ name: name, })
        .eq("languageId", id)
        .select();
    } else {
      response = await supabase
        .from("language")
        .insert([{ name: name}])
        .select();
    }
    const { error } = response;
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  
    revalidatePath("/languages");
    return {
      status: true,
      message: id ? "Actualizado correctamente" : "Guardado correctamente",
    };
  };

  export const GetLanguage = async (id: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("language")
      .select("*")
      .eq("languageId", id);
    if (error) {
      return {} as Languages;
    }
  
    return data?.[0] as Languages;
  };
  export const DeleteLanguage = async (id: string) => {
    const supabase = await createClient();

    const { error } = await supabase
      .from("language")
      .update({ state: false })
      .eq("languageId", id)
      .select();
  
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  
    revalidatePath("/languages");
    return {
      status: true,
      message: "Eliminado correctamente",
    };
  };