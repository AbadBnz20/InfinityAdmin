"use server";

import { PointForm, Points } from "@/interfaces/point-interfaces";
import { createClient } from "@/utils/server";

export const ListPoints = async () => {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("points_with_users_profile")
    .select(`*`);
  return profile as Points[];
};

export const EditPoints = async (
  points: string,
  dollar: string,
  id: string
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("point_dollar")
    .update({ points: points, dollar: dollar })
    .eq("idPointDollar", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  return {
    status: true,
    message: "Puntos actualizados correctamente",
  };
};

export const GetPoints = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("point_dollar").select("*");
  if (error) {
    return {} as PointForm;
  }

  return data?.[0] as PointForm;
};
