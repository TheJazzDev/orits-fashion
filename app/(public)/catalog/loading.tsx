// This file renders instantly while catalog data loads,
// giving users immediate visual feedback instead of a blank page.

export default function CatalogLoading() {
  return (
    <>
      {/* Hero skeleton */}
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

      {/* Skeleton body */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter pills skeleton */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 justify-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-8 rounded bg-stone-100 animate-pulse"
                style={{ width: `${60 + i * 10}px` }}
              />
            ))}
          </div>

          {/* Product grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[3/4] bg-stone-100 animate-pulse mb-2 md:mb-4" />
                <div className="h-2.5 md:h-3 w-1/3 bg-stone-100 animate-pulse rounded mb-1.5 md:mb-2" />
                <div className="h-3.5 md:h-4 w-3/4 bg-stone-200 animate-pulse rounded mb-1 md:mb-1.5" />
                <div className="h-2.5 md:h-3 w-1/2 bg-stone-100 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
