'use server';
import { Modules } from "@/interfaces/module-interfaces";
import { createClient } from "@/utils/server";

export const ListModules = async () => {
        const supabase = await createClient();
  
  const { data: modules, error } = await supabase.from("modules").select("*");
  return modules as Modules[];
};

type action = "register" | "update" | "delete";
export const InsertModule = async (
  roleid: string,
  modules: string[],
  action: action[]
) => {
  const supabase = await createClient();

  const verifiedregister: boolean = action.includes("register");
  const verifiedupdate: boolean = action.includes("update");
  const verifieddelete: boolean = action.includes("delete");

  const promises = modules.map(async (item) => {
    const { error } = await supabase
      .from("permissions")
      .insert([
        {
          roleId: roleid,
          moduleId: item,
          write: verifiedregister,
          update: verifiedupdate,
          delete: verifieddelete,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    }
  });

  await Promise.all(promises);
};
