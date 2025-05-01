"use server";
import { StateFormUser } from "@/components/form/UserForm";
import { Languages } from "@/interfaces/languages-interfaces";
import { Packages } from "@/interfaces/package-interfaces";
import { Role } from "@/interfaces/roles-interfaces";
import { State } from "@/interfaces/state-interfaces";
import { Profile, User } from "@/interfaces/users-interfaces";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const ListUsers = async () => {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profile_with_parther").select(`
    *,
    state (name),
    package (name),
    language (name),
    location (name)
  `).eq("state", true);
  // .not('role', 'is', null)
  // .eq('role.is_admin', is_admin);
  return profile as User[];
};

export interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  phono: string;
}
export const InsertUsers = async (
  parther: StateFormUser,
  date: string,
  DateSold: string,
  Expiration: string
) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: admin } = await supabase
    .from("admin")
    .select("IdLocation")
    .eq("IdUser", user?.id)
    .single();
  if (parther.id) {
    const { data: users, error } = await supabase
      .from("profile")
      .update([
        {
          firstname: parther.firstname,
          lastname: parther.lastname,
          address: parther.address,
          stateId: parther.stateId,
          packageId: parther.packageId,
          languageId: parther.languageId,
          DateSold: DateSold,
          Expiration: Expiration,
          discount: +parther.discount,
          IdCountry: parther.IdCountry,
          IdCity: parther.IdCity,
          IdLocation: admin?.IdLocation,
          NroContract: parther.NroContract,
          SecondaryEmail: parther.SecondaryEmail,
          StatusWallet: parther.StatusWallet,
          Note: parther.Note,
        },
      ])
      .eq("profileId", parther.id)
      .select();

    console.log(users);
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }

    revalidatePath("/partner");
    return {
      status: true,
      message: "Actualizado correctamente",
    };
  }
  const usercookie: UserData = {
    firstname: parther.firstname,
    lastname: parther.lastname,
    email: parther.email!,
    phono: parther.photo,
  };

  const { data, error } = await supabase.auth.admin.createUser({
    email: parther.email,
    phone: `${parther.code}${parther.phone}`,
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
        firstname: parther.firstname,
        lastname: parther.lastname,
        address: parther.address,
        photo: parther.photo,
        stateId: parther.stateId,
        packageId: parther.packageId,
        languageId: parther.languageId,
        discount: +parther.discount,
        birthdate: date,

        IdCountry: parther.IdCountry,
        IdCity: parther.IdCity,
        IdLocation: admin?.IdLocation,
        NroContract: parther.NroContract,
        DateSold: DateSold,
        Expiration: Expiration,
        SecondaryEmail: parther.SecondaryEmail,
        StatusWallet: parther.StatusWallet,
        Note: parther.Note,
      },
    ])
    .select();

  const { data: phone } = await supabase
    .from("phone")
    .insert([
      {
        type: "Phone",
        code: parther.code,
        number: parther.phone,
        profileId: users?.[0].profileId,
      },
    ])
    .select();

  if (error2) {
    console.log(error2);
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

export const GetUser = async (id: string) => {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("profileId", id)
    .single();
  if (error) {
    return {} as Profile;
  }
  return profile as Profile;
};

export const GetStateActive = async (id: string) => {
  const supabase = await createClient();

  let query = supabase.from("state").select("*").eq("state", true);

  if (id) {
    query = query.eq("countryId", id);
  }

  const { data: state, error } = await query;
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
    .eq("state", true)
  if (error) {
    return [];
  }
  return state as Role[];
};

export const UpdateSendEmail = async (id: string) => {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("SendEmail")
    .eq("profileId", id)
    .single();

  const update = +profile?.SendEmail + 1;

  const { data, error: error2 } = await supabase
    .from("profile")
    .update({ SendEmail: update })
    .eq("profileId", id)
    .select()
    .single();
  if (error2) {
    return {
      status: false,
      message: error2.message,
    };
  }
  revalidatePath("/partner");
  return {
    status: true,
    message: "Email Enviado",
  };
};

export const DeleteUser = async (id: string) => {
  const supabase = await createClient();
  const { data: profile, error } = await supabase
    .from("profile")
    .select("user_id")
    .eq("profileId", id)
    .single();

  const { data } = await supabase
    .from("profile")
    .update({ state: false })
    .eq("profileId", id)
    .select();


  const { data: user, error: error2 } =
    await supabase.auth.admin.updateUserById(profile?.user_id, {
      ban_duration: "120000h",
    });

  revalidatePath("/partner");


};
