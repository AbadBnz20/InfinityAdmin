'use server';

import { YachsRequest } from "@/interfaces/YachtsRequest";
import { createClient } from "@/utils/server";

export const ListYachtsRequest = async () => {
  const supabase = await createClient();
  const { data: yachtRequest, error } = await supabase
    .from("yachtRequest")
    .select("*, typeOfExperience(name), motorYacht(name)").eq("state", true);
  return yachtRequest as YachsRequest[]
};