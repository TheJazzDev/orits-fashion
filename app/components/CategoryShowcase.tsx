import Link from "next/link";

// Colour palette cycles through categories in order.
// Add more colours here if you add more categories in the admin panel.
const BG_PALETTE = [
  "bg-rose-900",
  "bg-slate-800",
  "bg-amber-900",
  "bg-indigo-900",
  "bg-stone-700",
  "bg-emerald-900",
  "bg-zinc-800",
  "bg-teal-900",
];

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

export default async function CategoryShowcase() {
  const categories = await getCategories();

  if (categories.length === 0) return null;

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14 lg:mb-16">
          <span className="text-gold-500 tracking-[0.3em] uppercase text-[10px] sm:text-xs font-medium">
            What We Offer
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-900 mt-3 md:mt-4">
            Our Collections
          </h2>
          <div className="w-12 sm:w-16 h-[1px] bg-gold-500 mx-auto mt-3 md:mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {categories.map((category, index) => {
            const bg = BG_PALETTE[index % BG_PALETTE.length];
            return (
              <Link
                key={category.slug}
                href={`/catalog?category=${category.slug}`}
                className="group block relative h-36 sm:h-52 md:h-72 overflow-hidden active:opacity-90"
              >
                <div
                  className={`absolute inset-0 ${bg} transition-transform duration-300 md:group-hover:scale-105`}
                />
                <div className="relative z-10 h-full flex flex-col justify-end p-3 sm:p-5 md:p-8">
                  <h3 className="font-heading text-sm sm:text-lg md:text-2xl text-white mb-0.5 md:mb-2">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-white/70 text-xs sm:text-sm hidden sm:block line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  <span className="mt-1.5 md:mt-4 text-gold-300 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium">
                    View &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
