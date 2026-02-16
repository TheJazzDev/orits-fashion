import Hero from "@/app/components/Hero";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import FeaturedProducts from "@/app/components/FeaturedProducts";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import Link from "next/link";

async function getFeaturedProducts() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.product.findMany({
      where: { featured: true, published: true },
      include: { images: { orderBy: { order: "asc" }, take: 1 }, category: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

async function getFeaturedReviews() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.review.findMany({
      where: { featured: true, approved: true },
      take: 5,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [products, reviews] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedReviews(),
  ]);

  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts products={products} />

      {/* About Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
                Our Story
              </span>
              <h2 className="font-heading text-4xl md:text-5xl text-stone-900 mt-4 mb-6">
                Crafting Elegance Since Day One
              </h2>
              <p className="text-stone-600 leading-relaxed mb-4">
                At Orit&apos;s Fashion, every garment tells a story. We blend
                timeless craftsmanship with contemporary design to create pieces
                that celebrate your unique beauty and style.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                From exquisite women&apos;s wear to distinguished men&apos;s garments,
                from handcrafted knitted pieces to elegant white garments — each
                creation is a testament to our passion for fashion excellence.
              </p>
              <Link
                href="/about"
                className="inline-block px-8 py-3 border border-stone-900 text-stone-900 text-sm tracking-[0.15em] uppercase font-medium hover:bg-stone-900 hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-cream-dark to-cream relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-heading text-6xl text-stone-300 mb-2">
                      O&apos;F
                    </div>
                    <div className="text-stone-400 text-xs tracking-[0.3em] uppercase">
                      Est. 2024
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-300 -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection reviews={reviews} />

      {/* CTA Section */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,149,28,0.06),_transparent_60%)]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
            Get Started
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-stone-900 mt-4 mb-6">
            Ready to Elevate Your Wardrobe?
          </h2>
          <p className="text-stone-600 leading-relaxed mb-10 text-lg">
            Whether you need a bespoke outfit for a special occasion or want to
            refresh your everyday style, we&apos;re here to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="px-10 py-4 bg-stone-900 text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-stone-800 transition-colors"
            >
              Browse Catalog
            </Link>
            <Link
              href="/contact"
              className="px-10 py-4 border border-stone-900 text-stone-900 text-sm tracking-[0.15em] uppercase font-medium hover:bg-stone-900 hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
