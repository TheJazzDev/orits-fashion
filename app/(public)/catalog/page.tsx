import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Catalog | Orit's Fashion",
  description:
    "Browse our collection of bespoke fashion pieces — women's wear, men's garments, children's clothing, knitted wear, and more.",
};

async function getProducts(category?: string) {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.product.findMany({
      where: {
        published: true,
        ...(category ? { category: { slug: category } } : {}),
      },
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.category.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params.category),
    getCategories(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-32 md:pb-20 bg-stone-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-[10px] sm:text-xs font-medium">
            Our Work
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-3 md:mt-4 mb-4 md:mb-6">
            Catalog
          </h1>
          <div className="w-12 sm:w-16 h-[1px] bg-gold-500 mx-auto mb-4 md:mb-6" />
          <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Explore our curated collection of handcrafted garments and designs.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 justify-center">
              <Link
                href="/catalog"
                className={`px-4 md:px-5 py-1.5 md:py-2 text-[10px] sm:text-xs tracking-[0.15em] uppercase border transition-colors ${
                  !params.category
                    ? "bg-stone-900 text-white border-stone-900"
                    : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/catalog?category=${cat.slug}`}
                  className={`px-4 md:px-5 py-1.5 md:py-2 text-[10px] sm:text-xs tracking-[0.15em] uppercase border transition-colors ${
                    params.category === cat.slug
                      ? "bg-stone-900 text-white border-stone-900"
                      : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalog/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-stone-100 mb-2 md:mb-4">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-100">
                        <span className="font-heading text-stone-300 text-lg">
                          O&apos;F
                        </span>
                      </div>
                    )}
                  </div>
                  {product.category && (
                    <p className="text-[10px] sm:text-xs text-gold-600 tracking-[0.15em] uppercase mb-0.5 md:mb-1">
                      {product.category.name}
                    </p>
                  )}
                  <h3 className="font-heading text-sm sm:text-base md:text-lg text-stone-900 group-hover:text-gold-700 transition-colors">
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-stone-500 text-xs sm:text-sm mt-0.5 md:mt-1">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(product.price)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            /* Empty state — no "coming soon", just an honest invitation */
            <div className="text-center py-16 md:py-24">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 md:mb-6 border border-stone-200 flex items-center justify-center">
                <span className="font-heading text-2xl sm:text-3xl text-stone-300">
                  O&apos;F
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-stone-900 mb-2 md:mb-3">
                {params.category
                  ? "No items in this category yet"
                  : "Our collection is being prepared"}
              </h3>
              <p className="text-stone-500 text-sm sm:text-base max-w-md mx-auto">
                {params.category
                  ? "Try another category or browse all pieces below."
                  : "We hand-craft every piece to order. Reach out and let us create something special for you."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 md:mt-8">
                {params.category && (
                  <Link
                    href="/catalog"
                    className="inline-block px-6 md:px-8 py-3 border border-stone-300 text-stone-600 text-xs sm:text-sm tracking-[0.15em] uppercase font-medium hover:border-stone-900 hover:text-stone-900 transition-colors"
                  >
                    View All
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="inline-block px-6 md:px-8 py-3 bg-stone-900 text-white text-xs sm:text-sm tracking-[0.15em] uppercase font-medium hover:bg-stone-800 transition-colors"
                >
                  Request Custom Order
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
