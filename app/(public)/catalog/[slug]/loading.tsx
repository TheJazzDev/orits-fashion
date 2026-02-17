export default function ProductDetailLoading() {
  return (
    <>
      {/* Back nav skeleton */}
      <div className="pt-24 md:pt-28 pb-4 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-32 bg-stone-100 animate-pulse rounded" />
        </div>
      </div>

      <section className="py-8 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 lg:gap-20">
            {/* Image skeleton */}
            <div>
              <div className="aspect-[3/4] bg-stone-100 animate-pulse" />
              <div className="flex gap-2 mt-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-16 h-20 sm:w-20 sm:h-24 bg-stone-100 animate-pulse shrink-0" />
                ))}
              </div>
            </div>

            {/* Info skeleton */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="h-3 w-24 bg-stone-100 animate-pulse rounded" />
              <div className="h-8 w-3/4 bg-stone-200 animate-pulse rounded" />
              <div className="h-[1px] w-10 bg-stone-200" />
              <div className="h-7 w-1/3 bg-stone-100 animate-pulse rounded" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-stone-100 animate-pulse rounded" />
                <div className="h-3 w-full bg-stone-100 animate-pulse rounded" />
                <div className="h-3 w-2/3 bg-stone-100 animate-pulse rounded" />
              </div>
              <div className="flex gap-3 pt-2">
                <div className="h-12 flex-1 bg-stone-200 animate-pulse" />
                <div className="h-12 flex-1 bg-stone-100 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
