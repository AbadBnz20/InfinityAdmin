"use server";

import { StateFormRoom } from "@/components/form/RoomForm";
import { Room } from "@/interfaces/room-interfaces";
import { createClient } from "@/utils/server";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");
const processImage = async (file: File) => {
  const buffer = await file.arrayBuffer();
  return sharp(Buffer.from(buffer))
    .resize(800) // Ajusta el tamaño máximo
    .webp({ quality: 80 }) // Convierte a formato webp
    .toBuffer();
};
const uploadImages = async (images: File) => {
  try {
    // Procesa y sube cada imagen
    try {
      // Procesa la imagen
      const processedBuffer = await processImage(images);

      // Convierte la imagen procesada a Base64 para subirla
      const base64Image = processedBuffer.toString("base64");

      // Sube la imagen procesada a Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(
        `data:image/webp;base64,${base64Image}`,
        { format: "webp", folder: "PackageYachts" }
      );

      return uploadedImage.secure_url; // Devuelve la URL segura
    } catch (error) {
      console.error("Error al procesar o subir la imagen:", error);
      return undefined; // En caso de error, devuelve null para esta imagen
    }
  } catch (error) {
    console.error("Error al subir las imágenes:", error);
    return undefined;
  }
};

const deleteImages = async (imageUrl: string) => {
  try {
    const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
    console.log({ imageName });
    const resp = await cloudinary.uploader.destroy(`Cards/${imageName}`);
    console.log(resp);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const ListRoom = async () => {
  const supabase = await createClient();
  const { data: room } = await supabase
    .from("room")
    .select("*")
    .eq("state", true);
  return room as Room[];
};

export interface StateRoom {
  IdRoom?: string;
  url?: string;
  name: string;
  numberOfBeds: string;
  typeOfBed: string;
  detail: string;
  numberOfGuests: string;
}

export const InterRoom = async (data: StateFormRoom) => {
  const supabase = await createClient();
  let response;

  const room: StateRoom = {
    name: data.name,
    numberOfBeds: data.numberOfBeds,
    typeOfBed: data.typeOfBed,
    detail: data.detail,
    numberOfGuests: data.numberOfGuests,
  };

  if (data.IdRoom) {
    if (data.image) {
      const resp = await deleteImages(data.url!);
      if (!resp) {
        return {
          status: false,
          message: "Error al eliminar la imagen anterior",
        };
      }
      room.url = await uploadImages(data.image);
    }

    response = await supabase
      .from("room")
      .update([room])
      .eq("IdRoom", data.IdRoom)
      .select();
  } else {
    room.url = await uploadImages(data.image);
    response = await supabase.from("room").insert([room]).select();
  }

  const { error } = response;
  console.log({ data, error });
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  revalidatePath("/rooms");
  return {
    status: true,
    message: data.IdRoom
      ? "Actualizado correctamente"
      : "Guardado correctamente",
  };
};


export const GetPackageRoom = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("room")
    .select("*")
    .eq("IdRoom", id)
    .single();
  if (error) {
    return {} as Room;
  }

  return data as Room;
};


export const DeleteYachsRoom = async (id: string) => {
    const supabase = await createClient();
  
    const { error } = await supabase
      .from("room")
      .update({ state: false })
      .eq("IdRoom", id)
      .select();
  
    if (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  
    revalidatePath("/rooms");
    return {
      status: true,
      message: "Eliminado correctamente",
    };
  };
