'use server';
import { Transfer } from "@/interfaces/transfer-interfaces";
import { createClient } from "@/utils/server";

export const ListTransferRequest = async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("transfer")
    .select(`*,
    arrival_car:transport_arrival_Id(model),
    return_car:transport_return_Id(model),   
    origin:originId(name),
    destination:destinationId(name) `).order("createDate", { ascending: false });
    // console.log(data)
  return data as unknown as  Transfer[]; 
};