'use server';

import { SeadustRequest } from "@/interfaces/reservation-interfaces";
import { createClient } from "@/utils/server";



export const ListSeadustRequest = async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("seadusRequest")
    .select("*, room(name,numberOfBeds,typeOfBed) ").eq("state", true).order("creationDate", { ascending: false });
   
  return data as SeadustRequest[]; 
};