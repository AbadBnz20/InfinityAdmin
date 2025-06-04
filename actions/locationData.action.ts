"use server";

import { createClient } from "@/utils/server";

export const ListLocationsAdmin = async () => {
  const supabase = await createClient();
  const [cityRes, countryRes, stateRes] = await Promise.all([
    supabase.from("city").select("*, state (name)").eq("status", true),
    supabase.from("country").select("*").eq("state", true),
    supabase
      .from("state")
      .select(
        `
        *,
        country (
          name
        )
      `
      )
      .eq("state", true),
  ]);

  const city = cityRes.data;
  const country = countryRes.data;
  const state = stateRes.data;
  return {
    cities: city || [],
    countries: country || [],
    states: state || [],
  };
};
