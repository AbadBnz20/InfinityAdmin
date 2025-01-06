"use server";
import { StateFormUser } from "@/components/form/UserForm";
import { Languages } from "@/interfaces/languages-interfaces";
import { Packages } from "@/interfaces/package-interfaces";
import { Role } from "@/interfaces/roles-interfaces";
import { State } from "@/interfaces/state-interfaces";
import { User } from "@/interfaces/users-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const ListUsers = async () => {
  //     let { data: profile, error } = await supabase
  //   .from('profile')
  //   .select(`
  //       *,
  //       country (name),
  //       state (name),
  //       package (name),
  //       language (name),
  //       role (name)
  //   `);
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profile_with_users").select(`
      *,
      state (name),
      package (name),
      language (name),
      role (name)
   `);

  return profile as User[];
};

export interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  phono: string;
}
export const InsertUsers = async (user: StateFormUser,date:string) => {
  const supabase = await createClient();

  const usercookie: UserData = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phono: user.photo,
  };

  const { data, error } = await supabase.auth.admin.createUser({
    email: user.email,
    phone: `${user.code}${user.phone}`,
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
    .from("profile")
    .insert([
      {
        user_id: data.user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        photo: user.photo,
        stateId: user.stateId,
        packageId: user.packageId,
        languageId: user.languageId,
        roleId: user.roleId,
        birthday:date
      },
    ])
    .select();

    const { data:phone  } = await supabase
    .from('phone')
    .insert([
      { type: 'Phone', code: user.code, number: user.phone, profileId: users?.[0].profileId },
    ])
    .select()



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

export const GetStateActive = async () => {
  const supabase = await createClient();

  const { data: state, error } = await supabase
    .from("state")
    .select("*")
    .eq("state", true);
  if (error) {
    return [];
  }
  return state as State[];
};

export const GetPackageActive = async () => {
  const supabase = await createClient();

  const { data: state, error } = await supabase
    .from("package")
    .select("*")
    .eq("state", true);
  if (error) {
    return [];
  }
  return state as Packages[];
};

export const GetLanguagesActive = async () => {
  const supabase = await createClient();

  const { data: state, error } = await supabase
    .from("language")
    .select("*")
    .eq("state", true);
  if (error) {
    return [];
  }
  return state as Languages[];
};

export const GetRoleActive = async () => {
  const supabase = await createClient();

  const { data: state, error } = await supabase
    .from("role")
    .select("*")
    .eq("state", true);
  if (error) {
    return [];
  }
  return state as Role[];
};
