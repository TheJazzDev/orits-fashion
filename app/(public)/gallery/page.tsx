import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | Orit's Fashion",
  description:
    "Browse our gallery of stunning fashion designs, behind-the-scenes moments, and creative inspirations.",
};

// Placeholder fashion images using Picsum (reliable, no CORS issues)
// These represent real gallery content — replace via admin panel with actual photos
const PLACEHOLDER_GALLERY = [
  {
    id: "ph-1",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    title: "Bespoke Evening Gown",
    description: "Hand-crafted evening wear with intricate detailing",
  },
  {
    id: "ph-2",
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    title: "Ankara Fusion Collection",
    description: "Modern silhouettes meet traditional African prints",
  },
  {
    id: "ph-3",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    title: "Bridal Couture",
    description: "Timeless elegance for your most special day",
  },
  {
    id: "ph-4",
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    title: "Street Style Editorial",
    description: "Effortless everyday fashion with a signature touch",
  },
  {
    id: "ph-5",
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    title: "Luxury Ready-to-Wear",
    description: "Premium fabrics, impeccable finishing",
  },
  {
    id: "ph-6",
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    title: "Men's Formal Collection",
    description: "Sharp cuts and refined tailoring for the modern gentleman",
  },
  {
    id: "ph-7",
    url: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80",
    title: "Children's Wear",
    description: "Adorable designs crafted for comfort and style",
  },
  {
    id: "ph-8",
    url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80",
    title: "Garments",
    description: "Pristine ceremony and occasion wear",
  },
];

async function getGalleryImages() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.galleryImage.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const dbImages = await getGalleryImages();
  // Use real DB images if available, otherwise show curated placeholders
  const images = dbImages.length > 0 ? dbImages : PLACEHOLDER_GALLERY;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-32 md:pb-20 bg-stone-950 text-white relative overflow-hidden">
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-[10px] sm:text-xs font-medium">
            Visual Stories
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 md:mt-4 mb-4 md:mb-6">
            Gallery
          </h1>
          <div className="w-12 sm:w-16 h-[1px] bg-gold-500 mx-auto mb-4 md:mb-6" />
          <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            A visual journey through our creations, inspirations, and
            behind-the-scenes moments.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid group relative overflow-hidden"
              >
                <Image
                  src={image.url}
                  alt={("title" in image && image.title) || "Gallery image"}
                  width={600}
                  height={800}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
                {(("title" in image && image.title) ||
                  ("description" in image && image.description)) && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                    <div className="p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {"title" in image && image.title && (
                        <h3 className="font-heading text-base md:text-lg text-white mb-1">
                          {image.title}
                        </h3>
                      )}
                      {"description" in image && image.description && (
                        <p className="text-white/80 text-xs md:text-sm">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
