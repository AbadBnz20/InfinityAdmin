"use server";

import { createClient } from "@/utils/server";


export const ChangeNumber = async (phone: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    phone: phone,
  });
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "Se a enviado un codigo al numero",
  };
};

export const VerifyNumber = async (phone: string, token: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: "phone_change",
  });

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "Numero actualizado",
  };
};

export const ChangeEmail = async (email: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const usercookie: UserData = {
    firstname: user?.user_metadata.first_name,
    lastname: user?.user_metadata.last_name,
    email: email,
    phono: user?.user_metadata.phone,
  };
  const { error } = await supabase.auth.updateUser({
    email: email,
    data: usercookie,
  });
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "Se a enviado un codigo al email",
  };
};

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  phono: string;
}

export const VerifyEmail = async (email: string, token: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "email_change",
    
  });


  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "Email actualizado",
  };
};
