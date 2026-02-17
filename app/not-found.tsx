import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-heading text-6xl sm:text-8xl text-stone-200 mb-4">
          404
        </div>
        <div className="w-12 h-[1px] bg-gold-500 mx-auto mb-6" />
        <h1 className="font-heading text-xl sm:text-2xl text-stone-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-stone-500 text-sm sm:text-base mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-stone-900 text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-stone-800 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/catalog"
            className="px-6 py-3 border border-stone-300 text-stone-600 text-xs tracking-[0.15em] uppercase font-medium hover:border-stone-900 hover:text-stone-900 transition-colors"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
