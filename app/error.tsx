"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="font-heading text-5xl sm:text-7xl text-stone-200 mb-4">
          Oops
        </div>
        <div className="w-12 h-[1px] bg-gold-500 mx-auto mb-6" />
        <h1 className="font-heading text-xl sm:text-2xl text-stone-900 mb-3">
          Something Went Wrong
        </h1>
        <p className="text-stone-500 text-sm sm:text-base mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again or return to the
          homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-stone-900 text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-stone-800 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-stone-300 text-stone-600 text-xs tracking-[0.15em] uppercase font-medium hover:border-stone-900 hover:text-stone-900 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
