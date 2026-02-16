"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  content: string;
}

const placeholderReviews: Review[] = [
  {
    id: "p1",
    name: "Amaka O.",
    rating: 5,
    content:
      "Orit's Fashion transformed my vision into reality. The attention to detail on my wedding outfit was impeccable. I felt like royalty on my special day!",
  },
  {
    id: "p2",
    name: "Chidinma E.",
    rating: 5,
    content:
      "I've been a loyal customer for years. Every piece is crafted with such care and precision. The quality speaks for itself.",
  },
  {
    id: "p3",
    name: "Bola A.",
    rating: 5,
    content:
      "From the consultation to the final fitting, the experience was seamless. My family's outfits for our reunion were absolutely stunning.",
  },
];

export default function TestimonialsSection({
  reviews,
}: {
  reviews: Review[];
}) {
  const displayReviews = reviews.length > 0 ? reviews : placeholderReviews;
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent((c) => (c + 1) % displayReviews.length);
  const prev = () =>
    setCurrent(
      (c) => (c - 1 + displayReviews.length) % displayReviews.length
    );

  return (
    <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,149,28,0.08),_transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 tracking-[0.3em] uppercase text-xs font-medium">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl mt-4">
            What Our Clients Say
          </h2>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-6" />
        </motion.div>

        <div className="relative min-h-[280px] flex items-center">
          <button
            onClick={prev}
            className="absolute -left-2 sm:left-0 z-10 p-2 text-stone-400 hover:text-white transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="w-full px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayReviews[current].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <Quote
                  size={40}
                  className="mx-auto mb-6 text-gold-500/40"
                />
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: displayReviews[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-gold-400 fill-gold-400"
                      />
                    )
                  )}
                </div>
                <p className="text-lg md:text-xl text-stone-200 leading-relaxed mb-8 italic">
                  &ldquo;{displayReviews[current].content}&rdquo;
                </p>
                <p className="text-gold-400 font-medium tracking-wide">
                  {displayReviews[current].name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="absolute -right-2 sm:right-0 z-10 p-2 text-stone-400 hover:text-white transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {displayReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-gold-400 w-6" : "bg-stone-600"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
