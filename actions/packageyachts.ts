"use server";

import { StateFormPackageYachts } from "@/components/form/PackageYachtsForm";
import { packageyachts } from "@/interfaces/packageyachts";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
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
    console.log({imageName});
    const resp= await cloudinary.uploader.destroy(`Cards/${imageName}`);
    console.log(resp)
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const ListPackageYachts = async () => {
  const supabase = await createClient();
  const { data: yachtPackage, error } = await supabase
    .from("yachtPackage")
    .select("*, origin_destination_ship (name)");
  return yachtPackage as packageyachts[];
};

interface PackageYach {
  image?: string;
  url?: string;
  time: string;
  passengers: string;
  price: number;
  points: number;
  ubicationId: string;
  name: string;
}

export const InsertPackageYachts = async (data: StateFormPackageYachts) => {
  const supabase = await createClient();
  let response;

  const packageYachst: PackageYach = {
    time:data.time,
    passengers:data.passengers,
    price:+data.price,
    points:+data.points,
    ubicationId:data.ubicationId,
    name:data.name
  };

  if (data.yachtPackageId) {
    if (data.image) {
      const resp = await deleteImages(data.url!);
      if (!resp) {
        return {
          status: false,
          message: "Error al eliminar la imagen anterior",
        };
      }
      packageYachst.image = await uploadImages(data.image);
    }

    response = await supabase
      .from("yachtPackage")
      .update([packageYachst])
      .eq("yachtPackageId", data.yachtPackageId)
      .select();
  } else {
    packageYachst.image = await uploadImages(data.image);
    response = await supabase.from("yachtPackage").insert([packageYachst]).select();
  }

  const { error } = response;
  console.log({data,error});
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  revalidatePath("/packageyachts");
  return {
    status: true,
    message: data.yachtPackageId
      ? "Actualizado correctamente"
      : "Guardado correctamente",
  };
};


export const GetPackageYachts = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("yachtPackage")
    .select("*")
    .eq("yachtPackageId", id)
    .single();
  if (error) {
    return {} as packageyachts;
  }

  return data as packageyachts;
};

export const DeleteYachsPackage = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("yachtPackage")
    .update({ state: false })
    .eq("yachtPackageId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/packageyachts");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};