import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | Orit's Fashion",
  description:
    "Browse our gallery of stunning fashion designs, behind-the-scenes moments, and creative inspirations.",
};

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
  const images = await getGalleryImages();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-900 via-neutral-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-xs font-medium">
            Visual Stories
          </span>
          <h1 className="font-heading text-5xl md:text-6xl mt-4 mb-6">
            Gallery
          </h1>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            A visual journey through our creations, inspirations, and
            behind-the-scenes moments.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="break-inside-avoid group relative overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={image.title || "Gallery image"}
                    width={600}
                    height={800}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                  />
                  {(image.title || image.description) && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                      <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        {image.title && (
                          <h3 className="font-heading text-lg text-white mb-1">
                            {image.title}
                          </h3>
                        )}
                        {image.description && (
                          <p className="text-white/80 text-sm">
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
                {[
                  "from-rose-100 to-rose-50",
                  "from-stone-200 to-stone-100",
                  "from-amber-100 to-amber-50",
                  "from-stone-100 to-cream",
                  "from-emerald-100 to-emerald-50",
                  "from-indigo-100 to-indigo-50",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center`}
                  >
                    <span className="text-stone-300 text-xs tracking-wide uppercase">
                      Coming Soon
                    </span>
                  </div>
                ))}
              </div>
              <h3 className="font-heading text-2xl text-stone-900 mb-3">
                Gallery Coming Soon
              </h3>
              <p className="text-stone-500 max-w-md mx-auto">
                We&apos;re preparing a visual showcase of our finest work. Stay
                tuned for stunning imagery.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
