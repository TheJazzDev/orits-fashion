import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] md:min-h-screen flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Subtle linen/textile texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.4) 2px,
            rgba(255,255,255,0.4) 3px
          ), repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.2) 2px,
            rgba(255,255,255,0.2) 3px
          )`,
        }}
      />

      {/* Warm radial glow — gold from center, fades out */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(212,149,28,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Bottom vignette to ground the section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in mb-3 md:mb-6">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-[10px] sm:text-xs font-medium">
            Welcome to
          </span>
        </div>

        <h1
          className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 md:mb-6 leading-tight animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          Orit&apos;s Fashion
        </h1>

        <div
          className="w-16 md:w-24 h-[1px] bg-gold-500 mx-auto mb-5 md:mb-8 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        />

        <p
          className="text-stone-400 text-sm sm:text-base md:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          Elegance in every stitch. Discover bespoke fashion designed to make
          you feel confident, beautiful, and uniquely you.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <Link
            href="/catalog"
            className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 bg-gold-500 text-white text-xs sm:text-sm tracking-[0.15em] uppercase font-medium text-center active:bg-gold-600 transition-colors"
          >
            Explore Collection
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 border border-white/25 text-white text-xs sm:text-sm tracking-[0.15em] uppercase font-medium text-center active:bg-white/10 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
