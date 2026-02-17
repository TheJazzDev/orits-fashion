import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Orit's Fashion",
  description:
    "Get in touch with Orit's Fashion. Book a consultation, request a custom design, or simply say hello.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-900 via-neutral-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-xs font-medium">
            Reach Out
          </span>
          <h1 className="font-heading text-5xl md:text-6xl mt-4 mb-6">
            Contact Us
          </h1>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you. Let&apos;s create something beautiful
            together.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-heading text-2xl text-stone-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-stone-200 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-gold-600" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.1em] uppercase text-stone-400 mb-1">
                      Email
                    </p>
                    <p className="text-stone-900 text-sm">
                      hello@oritsfashion.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-stone-200 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold-600" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.1em] uppercase text-stone-400 mb-1">
                      Phone
                    </p>
                    <p className="text-stone-900 text-sm">
                      +234 707 275 1152
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-stone-200 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-gold-600" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.1em] uppercase text-stone-400 mb-1">
                      Location
                    </p>
                    <p className="text-stone-900 text-sm">Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-stone-200 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-gold-600" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.1em] uppercase text-stone-400 mb-1">
                      Working Hours
                    </p>
                    <p className="text-stone-900 text-sm">
                      Mon - Sat: 9am - 6pm
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-cream">
                <h3 className="font-heading text-lg text-stone-900 mb-3">
                  Book a Consultation
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Want to discuss a custom design? We offer free initial
                  consultations to understand your vision and style preferences.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl text-stone-900 mb-8">
                Send a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
