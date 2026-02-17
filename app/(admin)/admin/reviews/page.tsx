"use client";

import { useEffect, useState } from "react";
import { Check, X, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  id: string;
  name: string;
  email: string | null;
  rating: number;
  content: string;
  featured: boolean;
  approved: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) setReviews(await res.json());
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const updateReview = async (
    id: string,
    data: Partial<{ approved: boolean; featured: boolean }>
  ) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...data } : r))
        );
        toast.success("Review updated");
      }
    } catch {
      toast.error("Failed to update review");
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        toast.success("Review deleted");
      }
    } catch {
      toast.error("Failed to delete review");
    }
  };

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.approved;
    if (filter === "approved") return r.approved;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-stone-900">Reviews</h1>
          <p className="text-stone-500 text-xs md:text-sm mt-1">
            Moderate client reviews
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors active:opacity-80 ${
                filter === f
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-500"
              }`}
            >
              {f}
              {f === "pending" &&
                ` (${reviews.filter((r) => !r.approved).length})`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 md:space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-white border border-stone-200 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 md:py-20 bg-white border border-stone-200">
          <h3 className="text-base md:text-lg font-medium text-stone-900 mb-2">
            No reviews found
          </h3>
          <p className="text-stone-500 text-xs md:text-sm">
            {filter === "pending"
              ? "No pending reviews to moderate."
              : "Reviews will appear here when clients submit them."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <div
              key={review.id}
              className={`bg-white border p-3 md:p-6 ${
                !review.approved
                  ? "border-amber-200 bg-amber-50/30"
                  : "border-stone-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-medium text-stone-900 text-sm">
                      {review.name}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className="text-gold-400 fill-gold-400"
                        />
                      ))}
                    </div>
                    {!review.approved && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-700">
                        Pending
                      </span>
                    )}
                    {review.featured && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-gold-100 text-gold-700">
                        Featured
                      </span>
                    )}
                  </div>
                  {review.email && (
                    <p className="text-xs text-stone-400 mb-1.5">
                      {review.email}
                    </p>
                  )}
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                    {review.content}
                  </p>
                  <p className="text-[10px] md:text-xs text-stone-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0 self-end sm:self-start">
                  {!review.approved && (
                    <button
                      onClick={() =>
                        updateReview(review.id, { approved: true })
                      }
                      className="p-2 text-emerald-500 active:bg-emerald-50 transition-colors rounded"
                      title="Approve"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  {review.approved && (
                    <button
                      onClick={() =>
                        updateReview(review.id, { approved: false })
                      }
                      className="p-2 text-amber-500 active:bg-amber-50 transition-colors rounded"
                      title="Unapprove"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button
                    onClick={() =>
                      updateReview(review.id, {
                        featured: !review.featured,
                      })
                    }
                    className={`p-2 transition-colors rounded ${
                      review.featured
                        ? "text-gold-500"
                        : "text-stone-300 active:text-gold-500"
                    }`}
                    title={
                      review.featured
                        ? "Remove from featured"
                        : "Mark as featured"
                    }
                  >
                    <Star
                      size={18}
                      className={review.featured ? "fill-current" : ""}
                    />
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-2 text-stone-300 active:text-red-500 transition-colors rounded"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
