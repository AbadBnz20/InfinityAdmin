"use server";
import { StateFormCard } from "@/components/form/CarForm";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@/utils/server";
import { revalidatePath } from "next/cache";
import { Car } from "@/interfaces/car-interfaces";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");
const processImage = async (file: File) => {
  const buffer = await file.arrayBuffer();
  return sharp(Buffer.from(buffer))
    .resize(800) // Ajusta el tamaño máximo
    .webp({ quality: 80 }) // Convierte a formato webp
    .toBuffer();
};

export const uploadImages = async (images: File) => {
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
        { format: "webp", folder: "Cards" }
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

export const deleteImages = async (imageUrl: string) => {
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

export const ListCars = async () => {
  const supabase = await createClient();
  let { data: car, error } = await supabase.from("car").select("*").eq("state", true);
  return car as Car[];
};

interface CarData {
  carId?: string;
  model: string;
  plate: string;
  ability: number;
  description: string;
  transferprice: number;
  type: string;
  brand: string;
  color: string;
  model_en: string;
  description_en: string;
  type_en: string;
  brand_en: string;
  color_en: string;
  image?: string;
  url?: string;
}

export const InsertCar = async (data: StateFormCard) => {
  const supabase = await createClient();
  let response;
  const carData: CarData = {
    model: data.model,
    plate: data.plate,
    ability: +data.ability,
    description: data.description,
    transferprice: +data.transferprice,
    type: data.type,
    brand: data.brand,
    color: data.color,
    model_en: data.model_en,
    description_en: data.description_en,
    type_en: data.type_en,
    brand_en: data.brand_en,
    color_en: data.color_en,
  };

  if (data.carId) {
    if (data.image) {
      const resp = await deleteImages(data.url!);
      if (!resp) {
        return {
          status: false,
          message: "Error al eliminar la imagen anterior",
        };
      }
      carData.image = await uploadImages(data.image);
    }

    response = await supabase
      .from("car")
      .update([carData])
      .eq("carId", data.carId)
      .select();
  } else {
    carData.image = await uploadImages(data.image);
    response = await supabase.from("car").insert([carData]).select();
  }

  const { error } = response;
  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  revalidatePath("/cars");
  return {
    status: true,
    message: data.carId
      ? "Actualizado correctamente"
      : "Guardado correctamente",
  };
};

export const GetCar = async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("car")
    .select("*")
    .eq("carId", id)
    .single();
  if (error) {
    return {} as Car;
  }

  return data as Car;
};


export const DeleteCar = async (id: string) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("car")
    .update({ state: false })
    .eq("carId", id)
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }

  revalidatePath("/cars");
  return {
    status: true,
    message: "Eliminado correctamente",
  };
};