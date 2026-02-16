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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="font-heading text-3xl text-white mb-4">
              Orit&apos;s
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Elegance in every stitch. Bespoke fashion designed to make you
              feel confident, beautiful, and uniquely you.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About", "Catalog", "Gallery", "Reviews", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-sm hover:text-gold-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 tracking-wide uppercase text-xs">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>Custom Design</li>
              <li>Alterations &amp; Tailoring</li>
              <li>Bridal Wear</li>
              <li>Ready to Wear</li>
              <li>Consultations</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4 tracking-wide uppercase text-xs">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0" />
                <span>hello@oritsfashion.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="hover:text-gold-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="hover:text-gold-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="hover:text-gold-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-sm text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} Orit&apos;s Fashion. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
