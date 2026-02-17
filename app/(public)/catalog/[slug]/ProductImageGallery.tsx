"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
}

export default function ProductImageGallery({
  images,
  name,
}: {
  images: ProductImage[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-stone-100 flex items-center justify-center">
        <span className="font-heading text-4xl text-stone-300">O&apos;F</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="aspect-[3/4] relative overflow-hidden bg-stone-100 group">
        <Image
          src={images[active].url}
          alt={images[active].alt || name}
          fill
          className="object-cover transition-opacity duration-300"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />

        {/* Arrow controls — only when multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="text-stone-800" />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="text-stone-800" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails — only when multiple images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border-2 transition-colors ${
                i === active ? "border-stone-900" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${name} ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
