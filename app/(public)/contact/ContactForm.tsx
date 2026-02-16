"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-stone-500 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-stone-500 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-stone-500 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="+234 XXX XXX XXXX"
          />
        </div>
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-stone-500 mb-2">
            Subject
          </label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors bg-white"
          >
            <option value="">Select a subject</option>
            <option value="Custom Design">Custom Design</option>
            <option value="Consultation">Consultation</option>
            <option value="Pricing Inquiry">Pricing Inquiry</option>
            <option value="Alteration">Alteration</option>
            <option value="General Inquiry">General Inquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-stone-500 mb-2">
          Message *
        </label>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-stone-200 text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your vision..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-10 py-4 bg-stone-900 text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
