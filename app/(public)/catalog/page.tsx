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
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-900 via-neutral-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-xs font-medium">
            Our Work
          </span>
          <h1 className="font-heading text-5xl md:text-6xl mt-4 mb-6">
            Catalog
          </h1>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            Explore our curated collection of handcrafted garments and designs.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              <Link
                href="/catalog"
                className={`px-5 py-2 text-xs tracking-[0.15em] uppercase border transition-colors ${
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
                  className={`px-5 py-2 text-xs tracking-[0.15em] uppercase border transition-colors ${
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/catalog/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-stone-100 mb-4">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-100">
                        <span className="text-stone-400 text-sm">
                          No Image
                        </span>
                      </div>
                    )}
                  </div>
                  {product.category && (
                    <p className="text-xs text-gold-600 tracking-[0.15em] uppercase mb-1">
                      {product.category.name}
                    </p>
                  )}
                  <h3 className="font-heading text-lg text-stone-900 group-hover:text-gold-700 transition-colors">
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-stone-500 text-sm mt-1">
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
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 border border-stone-200 flex items-center justify-center">
                <span className="font-heading text-3xl text-stone-300">
                  O&apos;F
                </span>
              </div>
              <h3 className="font-heading text-2xl text-stone-900 mb-3">
                Collection Coming Soon
              </h3>
              <p className="text-stone-500 max-w-md mx-auto">
                We&apos;re curating our finest pieces for you. Check back soon or
                contact us for custom orders.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-8 px-8 py-3 bg-stone-900 text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-stone-800 transition-colors"
              >
                Request Custom Order
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
