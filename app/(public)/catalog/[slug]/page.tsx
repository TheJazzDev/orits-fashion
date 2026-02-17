import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProductImageGallery from "./ProductImageGallery";

async function getProduct(slug: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.product.findUnique({
      where: { slug, published: true },
      include: {
        images: { orderBy: { order: "asc" } },
        category: true,
      },
    });
  } catch {
    return null;
  }
}

async function getRelatedProducts(categoryId: string | null, excludeSlug: string) {
  if (!categoryId) return [];
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.product.findMany({
      where: {
        categoryId,
        published: true,
        slug: { not: excludeSlug },
      },
      include: { images: { orderBy: { order: "asc" }, take: 1 } },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found | Orit's Fashion" };

  return {
    title: `${product.name} | Orit's Fashion`,
    description:
      product.description ||
      `Shop ${product.name} — bespoke fashion by Orit's Fashion, Lagos Nigeria.`,
    openGraph: {
      title: `${product.name} | Orit's Fashion`,
      description: product.description || `Bespoke fashion by Orit's Fashion`,
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, slug);

  const formattedPrice = product.price
    ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(product.price)
    : null;

  return (
    <>
      {/* Back nav */}
      <div className="pt-24 md:pt-28 pb-4 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Catalog
          </Link>
        </div>
      </div>

      {/* Product detail */}
      <section className="py-8 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 lg:gap-20">
            {/* Image gallery */}
            <ProductImageGallery images={product.images} name={product.name} />

            {/* Info */}
            <div className="flex flex-col justify-center">
              {product.category && (
                <Link
                  href={`/catalog?category=${product.category.slug}`}
                  className="text-[10px] sm:text-xs text-gold-600 tracking-[0.2em] uppercase mb-2 md:mb-3 hover:text-gold-700 transition-colors"
                >
                  {product.category.name}
                </Link>
              )}

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-stone-900 mb-4 md:mb-5 leading-tight">
                {product.name}
              </h1>

              <div className="w-10 h-[1px] bg-gold-500 mb-4 md:mb-6" />

              {formattedPrice && (
                <p className="text-xl sm:text-2xl text-stone-800 font-medium mb-5 md:mb-8">
                  {formattedPrice}
                </p>
              )}

              {product.description && (
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 md:mb-8">
                  {product.description}
                </p>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/contact?subject=Order Inquiry — ${encodeURIComponent(product.name)}`}
                  className="flex-1 sm:flex-none px-6 md:px-8 py-3.5 md:py-4 bg-gold-500 text-white text-xs sm:text-sm tracking-[0.15em] uppercase font-medium text-center hover:bg-gold-600 active:bg-gold-700 transition-colors"
                >
                  Order This Piece
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 sm:flex-none px-6 md:px-8 py-3.5 md:py-4 border border-stone-300 text-stone-700 text-xs sm:text-sm tracking-[0.15em] uppercase font-medium text-center hover:border-stone-900 hover:text-stone-900 active:bg-stone-50 transition-colors"
                >
                  Book Consultation
                </Link>
              </div>

              {/* Assurance */}
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-stone-100 grid grid-cols-2 gap-4 text-xs text-stone-500">
                <div>
                  <p className="font-medium text-stone-700 mb-0.5">Bespoke Made</p>
                  <p>Each piece crafted to order</p>
                </div>
                <div>
                  <p className="font-medium text-stone-700 mb-0.5">Custom Fit</p>
                  <p>Tailored to your measurements</p>
                </div>
                <div>
                  <p className="font-medium text-stone-700 mb-0.5">Premium Fabric</p>
                  <p>Quality materials only</p>
                </div>
                <div>
                  <p className="font-medium text-stone-700 mb-0.5">Lagos, Nigeria</p>
                  <p>Designed &amp; crafted locally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-10 md:py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-7 md:mb-10">
              <span className="text-gold-500 tracking-[0.3em] uppercase text-[10px] sm:text-xs font-medium">
                You May Also Like
              </span>
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-stone-900 mt-2">
                More from this Collection
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/catalog/${item.slug}`}
                  className="group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-stone-100 mb-2 md:mb-3">
                    {item.images[0] ? (
                      <Image
                        src={item.images[0].url}
                        alt={item.images[0].alt || item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-200">
                        <span className="font-heading text-stone-300">O&apos;F</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-sm sm:text-base text-stone-900 group-hover:text-gold-700 transition-colors">
                    {item.name}
                  </h3>
                  {item.price && (
                    <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(item.price)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
