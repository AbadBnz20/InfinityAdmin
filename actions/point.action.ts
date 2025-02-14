"use server";

import { Points } from "@/interfaces/point-interfaces";
import { createClient } from "@/utils/server";

export const ListPoints = async () => {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("points_with_users_profile").select(`*`);
 return profile as Points[]
};
