'use server';

import { FormStatePackage } from "@/components/form/PackageForm";
import { Packages } from "@/interfaces/package-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";

export const ListPackages = async () => {
      const supabase = await createClient();
  
    let { data } = await supabase
    .from('package')
    .select('*').eq("state", true);
   return data as Packages[]
  };

  export const InsertPackages = async (packages:FormStatePackage) => {
    const supabase = await createClient();

    let response;
    if (packages.id) {
      response = await supabase
        .from("package")
        .update({ name: packages.name,description:packages.description,percentage:+packages.percentage,price:+packages.price })
        .eq("packageId", packages.id)
        .select();
    } else {
      response = await supabase
        .from("package")
        .insert([{name: packages.name,description:packages.description,percentage:+packages.percentage,price:+packages.price }])
        .select();
    }
    const { error } = response;
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  
    revalidatePath("/packages");
    return {
      status: true,
      message: packages.id ? "Actualizado correctamente" : "Guardado correctamente",
    };
  };

  export const GetPackage = async (id: string) => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("package")
      .select("*")
      .eq("packageId", id);
    if (error) {
      return {} as Packages;
    }
  
    return data?.[0] as Packages;
  };


  export const DeletePackage = async (id: string) => {
    const supabase = await createClient();

    const { error } = await supabase
      .from("package")
      .update({ state: false })
      .eq("packageId", id)
      .select();
  
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  
    revalidatePath("/packages");
    return {
      status: true,
      message: "Eliminado correctamente",
    };
  };