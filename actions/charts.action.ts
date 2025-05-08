"use server";

import { PostHogApi } from "@/Api/PostHogAPI";
import { ChartsInterfaces } from "@/interfaces/Charts-interfaces";

export const GetChartsPoshog = async () => {
  try {
    const resp = await PostHogApi.get<ChartsInterfaces>("insights/", {
      params: {
        format: "json",
        refresh: "force_cache",
      },
    });

    return resp.data.results;
  } catch (error) {
    console.error("Error fetching charts:", error);
    return null;
  }
};
