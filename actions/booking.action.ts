"use server";

import { Booking } from "@/interfaces/booking-interfaces";
import { createClient } from "@/utils/server";

export const GetBooking = async () => {
  const supabase = await createClient();

  const { data: room_reservation } = await supabase
    .from("booking_with_users")
    .select("*");
  return room_reservation as Booking[]
};
