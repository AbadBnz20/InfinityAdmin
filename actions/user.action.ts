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

export const ListUsers = async (
  start: number = 0,
  end: number = 1000,
  searchTerm: string = ""
) => {
  const supabase = await createClient();
  let query = supabase
    .from("profile_with_parther")
    .select(
      `
    *,
    state (name),
    package (name),
    language (name),
    location (name)
  `,
      { count: "exact" }
    )
    .eq("state", true)
    .range(start, end);

  if (searchTerm.trim()) {
    const term = `%${searchTerm.trim()}%`;
    query = query.or(
      `firstname.ilike.${term},email.ilike.${term},phone.ilike.${term},NroContract.ilike.${term}`
    );
  }

  const { data: profile, error, count } = await query;

  // .not('role', 'is', null)
  // .eq('role.is_admin', is_admin);
  return {
    profile: profile as User[],
    count,
  };
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
    const { data: profile } = await supabase
      .from("profile")
      .select("user_id")
      .eq("profileId", parther.id)
      .single();
    const usercookie: UserData = {
      firstname: parther.firstname,
      lastname: parther.lastname,
      email: parther.email!,
      phono: parther.photo,
    };

    const { data: user, error: error2 } =
      await supabase.auth.admin.updateUserById(profile?.user_id, {
        email: parther.email,
        phone: parther.phone,
        email_confirm: true,
        phone_confirm: true,
        user_metadata: usercookie,
      });
    if (!error2) {
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
            coOwnerTelephone: parther.coOwnerTelephone,
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
  }
  const usercookie: UserData = {
    firstname: parther.firstname,
    lastname: parther.lastname,
    email: parther.email!,
    phono: parther.photo,
  };

  const { data, error } = await supabase.auth.admin.createUser({
    email: parther.email,
    phone: parther.phone,
    email_confirm: true,
    phone_confirm: true,
    user_metadata: usercookie,
    ban_duration: "24h",
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
        coOwnerTelephone: parther.coOwnerTelephone,
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

  // const { data: phone } = await supabase
  //   .from("phone")
  //   .insert([
  //     {
  //       type: "Phone",
  //       code: parther.code,
  //       number: parther.phone,
  //       profileId: users?.[0].profileId,
  //     },
  //   ])
  //   .select();

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

export const ChangeEmailAdmin = async (email: string, userId: string) => {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("user_id")
    .eq("profileId", userId)
    .single();
  console.log(profile);
  const { data: user, error } = await supabase.auth.admin.updateUserById(
    profile?.user_id,
    { email: email, email_confirm: true }
  );

  revalidatePath("/users");
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "Email  Actualizado",
  };
};

export const GetUser = async (id: string) => {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("profileId", id)
    .single();

  const { data: user, error: userError } =
    await supabase.auth.admin.getUserById(profile.user_id);
  if (error) {
    return {} as Profile;
  }
  if (userError) {
    return {} as Profile;
  }
  const UserProfile: Profile = {
    ...profile,
    email: user.user?.email,
    phone: user.user?.phone,
  };
  return UserProfile as Profile;
};

export const GetStateActive = async (id?: string) => {
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
    .eq("state", true);
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

export interface UserByExcel {
  NroContract: string;
  firstname: string;
  lastname: string;
  address: string;
  DateSold: string;
  Expiration: string;
  email: string;
  SecondaryEmail: string;
  phone: string;
  birthday: string;
  IdCountry: string;
  stateId: string;
  IdCity: string;
  packageId: string;
  languageId: string;
  StatusWallet: string;
  discount: string;
  Note: string;
  photo: string;
  IdLocation: string;
}

export const ImportUserByExcel = async (parther: UserByExcel[]) => {
  const users = await Promise.all(
    parther.map(async (user) => {
      const supabase = await createClient();
      const usercookie: UserData = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email!,
        phono: user.photo,
      };

      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        phone: user.phone,
        email_confirm: true,
        phone_confirm: true,
        user_metadata: usercookie,
        ban_duration: "24h",
      });

      if (error) {
        return {
          status: false,
          message: `Nro de Contrato: ${user.NroContract}, Error:${error.message} `,
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
            discount: +user.discount,
            birthdate: user.birthday,

            IdCountry: user.IdCountry,
            IdCity: user.IdCity,
            IdLocation: user.IdLocation,
            NroContract: user.NroContract,
            DateSold: user.DateSold,
            Expiration: user.Expiration,
            SecondaryEmail: user.SecondaryEmail,
            StatusWallet: user.StatusWallet,
            Note: user.Note,
          },
        ])
        .select();
      if (error2) {
        console.log(error2);
        return {
          status: false,
          message: `Nro de Contrato: ${user.NroContract}, Error:${error2.message} `,
        };
      }

      return {
        status: true,
        message: `Nro de Contrato: ${user.NroContract}, "Guardado correctamente `,
      };
    })
  );

  return users;
};
