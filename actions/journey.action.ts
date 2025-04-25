"use server";

import { Journey } from "@/interfaces/journey-interfaces";
import { createClient } from "@/utils/server";

export const ListJourney = async () => {
  const supabase = await createClient();

  const { data: quotes, error } = await supabase
    .from("quotes")
    .select("*").order("createDate", { ascending: false });
 return quotes as Journey[]  
};
