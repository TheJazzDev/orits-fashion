"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { X, Upload } from "lucide-react";

interface UploadedImage {
  url: string;
  publicId: string;
}

interface ImageUploadProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  multiple?: boolean;
}

export default function ImageUpload({
  images,
  onChange,
  multiple = true,
}: ImageUploadProps) {
  const onUpload = (result: { info?: { secure_url: string; public_id: string } | string }) => {
    if (result.info && typeof result.info !== "string") {
      const newImage: UploadedImage = {
        url: result.info.secure_url,
        publicId: result.info.public_id,
      };
      if (multiple) {
        onChange([...images, newImage]);
      } else {
        onChange([newImage]);
      }
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-4">
        {images.map((image, index) => (
          <div
            key={image.publicId}
            className="relative w-32 h-32 rounded border border-stone-200 overflow-hidden group"
          >
            <Image
              src={image.url}
              alt=""
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={onUpload}
        options={{
          maxFiles: multiple ? 10 : 1,
          folder: "orits-fashion",
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-stone-300 text-stone-500 text-sm hover:border-gold-500 hover:text-gold-600 transition-colors rounded"
          >
            <Upload size={16} />
            Upload {multiple ? "Images" : "Image"}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
