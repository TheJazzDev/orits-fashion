import Link from "next/link";

const categories = [
  {
    name: "Women's Wear",
    slug: "womens-wear",
    description: "Elegant designs for the modern woman",
    bg: "bg-rose-900",
  },
  {
    name: "Men's Wear",
    slug: "mens-wear",
    description: "Sophisticated style for the distinguished gentleman",
    bg: "bg-slate-800",
  },
  {
    name: "Children's Wear",
    slug: "childrens-wear",
    description: "Adorable outfits for the little ones",
    bg: "bg-amber-900",
  },
  {
    name: "Knitted Wear",
    slug: "knitted-wear",
    description: "Handcrafted warmth and comfort",
    bg: "bg-emerald-900",
  },
  {
    name: "English Wear",
    slug: "english-wear",
    description: "Classic British-inspired elegance",
    bg: "bg-indigo-900",
  },
  {
    name: "White Garments",
    slug: "white-garments",
    description: "Pure and pristine ceremonial attire",
    bg: "bg-stone-700",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
            What We Offer
          </span>
          <h2 className="font-heading text-3xl md:text-5xl text-stone-900 mt-3 md:mt-4">
            Our Collections
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-4 md:mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/catalog?category=${category.slug}`}
              className="group block relative h-40 sm:h-56 md:h-72 overflow-hidden active:opacity-90"
            >
              <div
                className={`absolute inset-0 ${category.bg} transition-transform duration-300 md:group-hover:scale-105`}
              />
              <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8">
                <h3 className="font-heading text-base sm:text-lg md:text-2xl text-white mb-1 md:mb-2">
                  {category.name}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm hidden sm:block">
                  {category.description}
                </p>
                <span className="mt-2 md:mt-4 text-gold-300 text-xs tracking-[0.15em] uppercase font-medium">
                  View &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
