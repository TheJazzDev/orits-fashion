"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    name: "Women's Wear",
    slug: "womens-wear",
    description: "Elegant designs for the modern woman",
    gradient: "from-rose-900/80 to-rose-800/60",
  },
  {
    name: "Men's Wear",
    slug: "mens-wear",
    description: "Sophisticated style for the distinguished gentleman",
    gradient: "from-slate-900/80 to-slate-800/60",
  },
  {
    name: "Children's Wear",
    slug: "childrens-wear",
    description: "Adorable outfits for the little ones",
    gradient: "from-amber-900/80 to-amber-800/60",
  },
  {
    name: "Knitted Wear",
    slug: "knitted-wear",
    description: "Handcrafted warmth and comfort",
    gradient: "from-emerald-900/80 to-emerald-800/60",
  },
  {
    name: "English Wear",
    slug: "english-wear",
    description: "Classic British-inspired elegance",
    gradient: "from-indigo-900/80 to-indigo-800/60",
  },
  {
    name: "White Garments",
    slug: "white-garments",
    description: "Pure and pristine ceremonial attire",
    gradient: "from-stone-700/80 to-stone-600/60",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
            What We Offer
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-stone-900 mt-4">
            Our Collections
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/catalog?category=${category.slug}`}
                className="group block relative h-72 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-all duration-500 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <h3 className="font-heading text-2xl text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-sm">{category.description}</p>
                  <span className="mt-4 text-gold-300 text-xs tracking-[0.2em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Collection &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
