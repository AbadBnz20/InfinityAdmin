"use server";
import { StateFormUser } from "@/components/form/UserForm";
import { Languages } from "@/interfaces/languages-interfaces";
import { Packages } from "@/interfaces/package-interfaces";
import { Role } from "@/interfaces/roles-interfaces";
import { State } from "@/interfaces/state-interfaces";
import { User } from "@/interfaces/users-interfaces";
import { supabase } from "@/utils/server";
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

  const { data: profile } = await supabase.from("profile_with_users")
    .select(`
      *,
      state (name),
      package (name),
      language (name),
      role (name)
   `);

  return profile as User[];
};

export const InsertUsers = async (user: StateFormUser) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email: user.email,
    phone: user.phone,
    email_confirm: true,
    phone_confirm: true,
    user_metadata: { firstname: user.firstname, lastname: user.lastname },
  });

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  let { data: users, error: error2 } = await supabase
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

export const GetStateActive = async () => {
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
  const { data: state, error } = await supabase
    .from("role")
    .select("*")
    .eq("state", true);
  if (error) {
    return [];
  }
  return state as Role[];
};
