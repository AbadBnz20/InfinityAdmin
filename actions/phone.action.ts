'use server';

import { Phone } from "@/interfaces/phones-interfaces";
import { supabase } from "@/utils/server";


export const ListPhone = async () => {
    let { data: phone, error } = await supabase
  .from('phone')
  .select(`*,
      profile (
        photo,lastname,firstname
      )`);
    
      return phone as Phone[];
  };

