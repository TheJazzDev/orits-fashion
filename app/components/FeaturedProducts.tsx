import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  images: { url: string; alt: string | null }[];
  category: { name: string } | null;
}

export default function FeaturedProducts({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
              Curated For You
            </span>
            <h2 className="font-heading text-3xl md:text-5xl text-stone-900 mt-3 md:mt-4">
              Featured Pieces
            </h2>
            <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-4 md:mt-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-stone-200 mb-3 md:mb-4 flex items-center justify-center">
                  <span className="text-stone-400 text-xs sm:text-sm tracking-wide">
                    Coming Soon
                  </span>
                </div>
                <div className="h-3 md:h-4 w-3/4 bg-stone-200 rounded mb-2" />
                <div className="h-2 md:h-3 w-1/2 bg-stone-100 rounded" />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <p className="text-stone-500 text-sm">
              Our featured collection is being curated. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
            Curated For You
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-stone-900 mt-3 md:mt-4">
            Featured Pieces
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/catalog/${product.slug}`}
              className="group block active:opacity-90"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-stone-100 mb-2 md:mb-4">
                {product.images[0] ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover md:group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                    <span className="text-stone-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              {product.category && (
                <p className="text-[10px] sm:text-xs text-gold-600 tracking-[0.15em] uppercase mb-0.5 md:mb-1">
                  {product.category.name}
                </p>
              )}
              <h3 className="font-heading text-sm sm:text-base md:text-lg text-stone-900">
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

        <div className="text-center mt-8 md:mt-12">
          <Link
            href="/catalog"
            className="inline-block w-full sm:w-auto px-10 py-4 border border-stone-900 text-stone-900 text-sm tracking-[0.15em] uppercase font-medium text-center active:bg-stone-900 active:text-white transition-colors"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}
