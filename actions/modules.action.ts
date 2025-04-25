"use server";
import { Modules } from "@/interfaces/module-interfaces";
import { createClient } from "@/utils/server";
import { ModulePermissionsInser } from "./roles.action";

export const ListModules = async () => {
  const supabase = await createClient();

  const { data: modules, error } = await supabase.from("modules").select("*");
  return modules as Modules[];
};

export const InsertModule = async (permission: ModulePermissionsInser[]) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("permissions")
    .insert(permission)
    .select();
  if (error) {
    console.log(error);
  }
};
