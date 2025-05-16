"use server";

import { StateFormAdmin } from "@/components/form/AdminForm";
import { UserData } from "./user.action";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { Admin } from "@/interfaces/admin-interfaces";


export const ListAdmin = async () => {


  const supabase = await createClient();
  const { data, error } = await supabase.from("admin").select('IdAdmin, firstName, lastName, address,email,phone,status, country(name), role(name), location(name), position(name), department(name), state(name)').eq('status',true);
  return data as unknown as  Admin[];
}



export const InsertAdmin = async (useradmin: StateFormAdmin) => {
  const supabase = await createClient();
  if (useradmin.id) {
  }
  const usercookie: UserData = {
    firstname: useradmin.firstname,
    lastname: useradmin.lastname,
    email: useradmin.email!,
    phono: "",
  };
  const { data, error } = await supabase.auth.admin.createUser({
    email: useradmin.email,
    phone: `${useradmin.code}${useradmin.phone}`,
    email_confirm: true,
    phone_confirm: true,
    user_metadata: usercookie,
  });
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  const { data: users, error: error2 } = await supabase
    .from("admin")
    .insert([
      {
        IdUser: data.user.id,
        firstName: useradmin.firstname,
        lastName: useradmin.lastname,
        address: useradmin.address,
        email: useradmin.email,
        phone: `${useradmin.code}${useradmin.phone}`,
        IdCountry: useradmin.IdCountry,
        IdRole: useradmin.IdRole,
        IdLocation: useradmin.IdLocation,
        IdPosition: useradmin.IdPosition,
        IdDepartment: useradmin.IdDepartment,
        IdState: useradmin.IdState,
      },
    ])
    .select();

  if (error2) {
    return {
      status: false,
      message: error2.message,
    };
  }
  revalidatePath("/users");

  return {
    status: true,
    message: "Guardado correctamente",
  };
};



export const DeleteAdmin = async (id: string) => {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("admin")
    .select("IdUser")
    .eq("IdAdmin", id)
    .single();

  const { data } = await supabase
    .from("profile")
    .update({ state: false })
    .eq("profileId", id)
    .select();

  const { data: user, error: error2 } =
    await supabase.auth.admin.updateUserById(profile?.IdUser, {
      ban_duration: "120000h",
    });

  revalidatePath("/users");
};
