"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, rating, content }),
      });
      if (res.ok) {
        toast.success("Thank you! Your review has been submitted for approval.");
        setName("");
        setEmail("");
        setRating(5);
        setContent("");
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
            Your Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-stone-200 bg-white text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-stone-500 mb-2">
            Email (optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-stone-200 bg-white text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-stone-500 mb-2">
          Rating *
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(star)}
              className="p-0.5"
            >
              <Star
                size={24}
                className={`transition-colors ${
                  star <= (hoveredStar || rating)
                    ? "text-gold-400 fill-gold-400"
                    : "text-stone-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-[0.1em] uppercase text-stone-500 mb-2">
          Your Review *
        </label>
        <textarea
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 border border-stone-200 bg-white text-stone-900 text-sm focus:border-gold-500 focus:outline-none transition-colors resize-none"
          placeholder="Share your experience with us..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-8 py-4 bg-stone-900 text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
