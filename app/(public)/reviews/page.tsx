import type { Metadata } from "next";
import { Star } from "lucide-react";
import ReviewForm from "./ReviewForm";

export const metadata: Metadata = {
  title: "Reviews | Orit's Fashion",
  description:
    "Read what our clients say about their experience with Orit's Fashion.",
};

async function getApprovedReviews() {
  try {
    const { prisma } = await import("@/lib/prisma");
    return await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-stone-900 via-neutral-800 to-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-gold-400 tracking-[0.3em] uppercase text-xs font-medium">
            Client Love
          </span>
          <h1 className="font-heading text-5xl md:text-6xl mt-4 mb-6">
            Reviews
          </h1>
          <div className="w-16 h-[1px] bg-gold-500 mx-auto mb-6" />
          <p className="text-stone-300 text-lg max-w-2xl mx-auto">
            Hear from our valued clients about their experience with Orit&apos;s
            Fashion.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviews.length > 0 ? (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-stone-100 pb-8 last:border-0"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="text-gold-400 fill-gold-400"
                      />
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <Star
                        key={`empty-${i}`}
                        size={14}
                        className="text-stone-200"
                      />
                    ))}
                  </div>
                  <p className="text-stone-700 leading-relaxed mb-3 italic">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-stone-500">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-900">
                        {review.name}
                      </p>
                      <p className="text-xs text-stone-400">
                        {new Intl.DateTimeFormat("en-NG", {
                          year: "numeric",
                          month: "long",
                        }).format(new Date(review.createdAt))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-12">
              <h3 className="font-heading text-2xl text-stone-900 mb-3">
                Be the First to Share Your Experience
              </h3>
              <p className="text-stone-500">
                We&apos;d love to hear about your experience with Orit&apos;s Fashion.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Review Form */}
      <section className="py-16 bg-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-gold-500 tracking-[0.3em] uppercase text-xs font-medium">
              Share Your Story
            </span>
            <h2 className="font-heading text-3xl text-stone-900 mt-4">
              Leave a Review
            </h2>
            <div className="w-12 h-[1px] bg-gold-500 mx-auto mt-4" />
          </div>
          <ReviewForm />
        </div>
      </section>
    </>
  );
}
