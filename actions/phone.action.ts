'use server';

import { Phone } from "@/interfaces/phones-interfaces";
import { createClient } from "@/utils/server";


export const ListPhone = async () => {
    const supabase = await createClient();
  
    let { data: phone, error } = await supabase
  .from('phone')
  .select(`*,
      profile (
        photo,lastname,firstname
      )`);
    
      return phone as Phone[];
  };

