import type { Metadata } from "next";
import Link from "next/link";
import { Scissors, Heart, Sparkles, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Orit's Fashion",
  description:
    "Learn about Orit's Fashion — our story, our designer, and our commitment to elegance in every stitch.",
};

const values = [
  {
    icon: Scissors,
    title: "Masterful Craftsmanship",
    description:
      "Every stitch is placed with intention and care. We take pride in the art of garment construction.",
  },
  {
    icon: Heart,
    title: "Client-Centered Design",
    description:
      "Your vision drives our creativity. We listen, understand, and deliver fashion that speaks to your soul.",
  },
  {
    icon: Sparkles,
    title: "Unique Creations",
    description:
      "No two clients are alike, and neither are our designs. Each piece is crafted to celebrate your individuality.",
  },
  {
    icon: Award,
    title: "Quality Without Compromise",
    description:
      "From fabric selection to final fitting, we maintain the highest standards at every step.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-900 via-neutral-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-xs font-medium">
            Our Story
          </span>
          <h1 className="font-heading text-5xl md:text-6xl mt-4 mb-6">
            About Orit&apos;s Fashion
          </h1>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            Where passion meets precision, and every garment is a work of art.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mb-6">
                A Journey of Passion &amp; Purpose
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Orit&apos;s Fashion was born from a deep love for textiles, design,
                and the transformative power of clothing. What began as a
                creative passion has blossomed into a fashion house that serves
                clients who value quality, elegance, and personal expression.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Our journey has been defined by an unwavering commitment to
                excellence. From women&apos;s haute couture to men&apos;s bespoke
                tailoring, from beautiful knitted creations to pristine white
                garments — we pour our heart into every collection.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Today, Orit&apos;s Fashion stands as a testament to what happens when
                talent meets dedication. We don&apos;t just make clothes — we craft
                confidence, celebrate culture, and create memories that last a
                lifetime.
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-square bg-gradient-to-br from-stone-100 to-cream relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-heading text-8xl text-stone-200">
                      O&apos;F
                    </div>
                    <div className="w-12 h-[1px] bg-gold-400 mx-auto mt-4 mb-3" />
                    <div className="text-stone-400 text-xs tracking-[0.4em] uppercase">
                      Fashion House
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Designer */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="aspect-[3/4] bg-gradient-to-br from-stone-200 to-stone-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Scissors size={48} className="mx-auto text-stone-300 mb-4" />
                    <div className="text-stone-400 text-sm tracking-wide">
                      The Designer
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
                The Creative Mind
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-stone-900 mt-4 mb-6">
                Meet the Designer
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                Behind every beautiful creation at Orit&apos;s Fashion is a
                designer with an extraordinary eye for detail, an innate
                understanding of fabric and form, and a passion that turns
                ordinary materials into extraordinary garments.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                With expertise spanning across multiple fashion domains —
                women&apos;s wear, men&apos;s tailoring, children&apos;s clothing, knitted
                creations, English wear, and ceremonial white garments — our
                designer brings versatility and mastery to every project.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Each consultation is a collaborative journey, ensuring that your
                personal style and preferences are woven into every thread.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
              What Drives Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl text-stone-900 mt-4">
              Our Values
            </h2>
            <div className="w-16 h-[1px] bg-gold-500 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 border border-stone-200 flex items-center justify-center group-hover:border-gold-400 group-hover:bg-gold-50 transition-all duration-300">
                    <Icon
                      size={24}
                      className="text-stone-400 group-hover:text-gold-600 transition-colors"
                    />
                  </div>
                  <h3 className="font-heading text-xl text-stone-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl mb-6">
            Let&apos;s Create Something Beautiful Together
          </h2>
          <p className="text-stone-300 mb-8">
            Ready to start your fashion journey with us? We&apos;d love to hear your
            vision.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-gold-500 hover:bg-gold-600 text-white text-sm tracking-[0.15em] uppercase font-medium transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
