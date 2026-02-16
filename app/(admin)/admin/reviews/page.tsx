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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Reviews</h1>
          <p className="text-stone-500 text-sm mt-1">
            Moderate client reviews
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                filter === f
                  ? "bg-stone-900 text-white"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200"
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
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-white border border-stone-200 animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white border border-stone-200">
          <h3 className="text-lg font-medium text-stone-900 mb-2">
            No reviews found
          </h3>
          <p className="text-stone-500 text-sm">
            {filter === "pending"
              ? "No pending reviews to moderate."
              : "Reviews will appear here when clients submit them."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((review) => (
            <div
              key={review.id}
              className={`bg-white border p-6 ${
                !review.approved
                  ? "border-amber-200 bg-amber-50/30"
                  : "border-stone-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-stone-900 text-sm">
                      {review.name}
                    </span>
                    {review.email && (
                      <span className="text-xs text-stone-400">
                        {review.email}
                      </span>
                    )}
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="text-gold-400 fill-gold-400"
                        />
                      ))}
                    </div>
                    {!review.approved && (
                      <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700">
                        Pending
                      </span>
                    )}
                    {review.featured && (
                      <span className="text-xs px-2 py-0.5 bg-gold-100 text-gold-700">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {review.content}
                  </p>
                  <p className="text-xs text-stone-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {!review.approved && (
                    <button
                      onClick={() =>
                        updateReview(review.id, { approved: true })
                      }
                      className="p-1.5 text-emerald-500 hover:bg-emerald-50 transition-colors rounded"
                      title="Approve"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  {review.approved && (
                    <button
                      onClick={() =>
                        updateReview(review.id, { approved: false })
                      }
                      className="p-1.5 text-amber-500 hover:bg-amber-50 transition-colors rounded"
                      title="Unapprove"
                    >
                      <X size={16} />
                    </button>
                  )}
                  <button
                    onClick={() =>
                      updateReview(review.id, {
                        featured: !review.featured,
                      })
                    }
                    className={`p-1.5 transition-colors rounded ${
                      review.featured
                        ? "text-gold-500 hover:bg-gold-50"
                        : "text-stone-300 hover:text-gold-500 hover:bg-gold-50"
                    }`}
                    title={
                      review.featured
                        ? "Remove from featured"
                        : "Mark as featured"
                    }
                  >
                    <Star
                      size={16}
                      className={review.featured ? "fill-current" : ""}
                    />
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-1.5 text-stone-300 hover:text-red-500 transition-colors rounded"
                    title="Delete"
                  >
                    <Trash2 size={16} />
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
