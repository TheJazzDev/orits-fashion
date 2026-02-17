import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-heading text-2xl md:text-3xl text-white mb-3 md:mb-4">
              Orit&apos;s
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Elegance in every stitch. Bespoke fashion designed to make you
              feel confident, beautiful, and uniquely you.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 md:mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2.5 md:space-y-3">
              {["About", "Catalog", "Gallery", "Reviews", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-sm active:text-gold-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 md:mb-4 tracking-wide uppercase text-xs">
              Services
            </h4>
            <ul className="space-y-2.5 md:space-y-3 text-sm">
              <li>Custom Design</li>
              <li>Alterations</li>
              <li>Bridal Wear</li>
              <li>Ready to Wear</li>
              <li>Consultations</li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-medium mb-3 md:mb-4 tracking-wide uppercase text-xs">
              Contact Us
            </h4>
            <ul className="space-y-2.5 md:space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />
                <span>hello@oritsfashion.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                <span>+234 707 275 1152</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
            <div className="flex gap-5 mt-5 md:mt-6">
              <a
                href="#"
                className="active:text-gold-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="active:text-gold-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="active:text-gold-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 md:mt-12 pt-6 md:pt-8 text-center text-xs sm:text-sm text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Orit&apos;s Fashion. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
