"use client";

import { motion } from "framer-motion";
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
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
              Curated For You
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-stone-900 mt-4">
              Featured Pieces
            </h2>
            <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-stone-200 to-stone-100 mb-4 flex items-center justify-center">
                  <span className="text-stone-400 text-sm tracking-wide">
                    Coming Soon
                  </span>
                </div>
                <div className="h-4 w-3/4 bg-stone-200 rounded mb-2" />
                <div className="h-3 w-1/2 bg-stone-100 rounded" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-stone-500 mb-4">
              Our featured collection is being curated. Check back soon!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
            Curated For You
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-stone-900 mt-4">
            Featured Pieces
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <Link href={`/catalog/${product.slug}`}>
                <div className="aspect-[3/4] relative overflow-hidden bg-stone-100 mb-4">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-100 flex items-center justify-center">
                      <span className="text-stone-400 text-sm">No Image</span>
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/catalog"
            className="inline-block px-10 py-4 border border-stone-900 text-stone-900 text-sm tracking-[0.15em] uppercase font-medium hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            View All
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
