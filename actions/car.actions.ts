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
        { format: "webp", folder: "Cards" }
      );

      return uploadedImage.secure_url; // Devuelve la URL segura
    } catch (error) {
      console.error("Error al procesar o subir la imagen:", error);
      return null; // En caso de error, devuelve null para esta imagen
    }
  } catch (error) {
    console.error("Error al subir las imágenes:", error);
    return null;
  }
};

export const ListCars = async () => {
  const supabase = await createClient();
  let { data: car, error } = await supabase
  .from('car')
  .select('*')
 return car as Car[]
}



export const InsertCar = async (data: StateFormCard) => {
  const supabase = await createClient();
  const urlimage = await uploadImages(data.image);

  const { data: car, error } = await supabase
    .from("car")
    .insert([
      {
        model: data.model,
        plate: data.plate,
        ability: +data.ability,
        description: data.description,
        transferprice: +data.transferprice,
        image: urlimage,
      },
    ])
    .select();

  if (error) {
    return {
      status: false,
      message: error.message,
    };
  }
  revalidatePath("/users");
  return {
    status: true,
    message: "Guardado correctamente",
  };
};
