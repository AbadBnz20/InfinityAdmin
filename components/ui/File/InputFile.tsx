import { StateFormCard } from "@/components/form/CarForm";

import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { IoCloseOutline, IoImageOutline } from "react-icons/io5";
interface Props {
  control: Control<StateFormCard>;
  errors?: FieldErrors<StateFormCard>;
  watch: UseFormWatch<StateFormCard>;
  isRequired: boolean;
}
export const InputFile = ({ control, errors, isRequired }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      field.onChange(file); // Actualizar el valor del campo
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, field: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      field.onChange(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveImage = (field: any) => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      field.onChange(null);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <Controller
      name={"image"}
      control={control}
      rules={{
        required: isRequired ? "Debe seleccionar una foto de usted" : false,
      }}
      render={({ field }) => (
        <div className="w-full max-w-md mx-auto space-y-4">
          <div className="p-4">
            <div
              className={`border-2 ${
                errors?.image ? "border-[#f31260]" : "border-dashed"
              } border-dashed  rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors`}
              onClick={() => inputRef.current?.click()}
              onDrop={(e) => handleDrop(e, field)}
              onDragOver={handleDragOver}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, field)}
                className="hidden"
                aria-label="Upload image"
              />
              {imageUrl ? (
                <div className="relative aspect-video">
                  <button
                    className="absolute -right-2 -top-2 z-10 h-6 w-6 rounded-full grid justify-center items-center bg-black text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(field);
                    }}
                    aria-label="Remove image"
                  >
                    <IoCloseOutline />
                  </button>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="rounded-lg object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className={`py-8 flex flex-col items-center gap-2 text-muted-foreground   ${
                    errors?.image ? "text-[#f31260]" : "text-gray-700"
                  }`}
                >
                  <IoImageOutline className="w-8 h-8" />
                  <div>
                    <p className="text-small">
                      Arrastre y suelte su imagen aquí o haga clic para explorar
                    </p>
                    <p className="text-sm">JPG, PNG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    />
  );
};
