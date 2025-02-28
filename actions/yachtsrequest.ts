'use server';

import { YachsRequest } from "@/interfaces/YachtsRequest";
import { createClient } from "@/utils/server";

export const ListYachtsRequest = async () => {
  const supabase = await createClient();
  const { data: yachtRequest, error } = await supabase
    .from("yachtRequest")
    .select("*, origin_destination_ship ( name ), typeOfExperience(name), motorYacht(name)");
  return yachtRequest as YachsRequest[]
};