"use server";
import { createClient } from "@/utils/server";
import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";

export const signInAction = async (email: string, token: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
      captchaToken: token,
    },
  });
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "",
  };
};

export const signInActionVerifyOTP = async (email: string, token: string) => {
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email,
    token: token,
    type: "email",
  });
  if (error) {
    return encodedRedirect("error", "/auth/login", error.message);
  }
  return redirect("/");
};

export const signInActionPhone = async (phone: string, token: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    phone: phone,
    options: {
      shouldCreateUser: false,
      captchaToken: token,
    },
  });
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
    message: "",
  };
};

export const signInActionVerifyOTPPhone = async (
  phone: string,
  token: string
) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: "sms",
  });
  if (error) {
    return encodedRedirect("error", "/auth/login", error.message);
  }
  return redirect("/");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth/login");
};
