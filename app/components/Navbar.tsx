"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/catalog", label: "Catalog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || !isHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          solid ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              className={`font-heading text-xl md:text-2xl tracking-wide transition-colors ${
                solid ? "text-stone-900" : "text-white"
              }`}
            >
              Orit&apos;s Fashion
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                    pathname === link.href
                      ? solid
                        ? "text-gold-600 font-semibold"
                        : "text-gold-400 font-semibold"
                      : solid
                        ? "text-stone-500 hover:text-stone-900"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 -mr-2 transition-colors active:opacity-70 ${
                solid ? "text-stone-900" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white animate-fade-in md:hidden">
          {/* Close button inside the overlay */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 p-2 text-stone-900 active:opacity-70"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-heading tracking-wide py-2 active:opacity-70 ${
                  pathname === link.href
                    ? "text-gold-600"
                    : "text-stone-400"
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
