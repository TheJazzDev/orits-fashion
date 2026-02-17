"use client";

import { useEffect, useState } from "react";
import { Package, FolderOpen, Star, Mail, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Stats {
  products: number;
  categories: number;
  pendingReviews: number;
  unreadMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/products");
        const products = res.ok ? await res.json() : [];
        const catRes = await fetch("/api/categories");
        const categories = catRes.ok ? await catRes.json() : [];
        const revRes = await fetch("/api/reviews");
        const reviews = revRes.ok ? await revRes.json() : [];
        const msgRes = await fetch("/api/contact");
        const messages = msgRes.ok ? await msgRes.json() : [];

        setStats({
          products: Array.isArray(products) ? products.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0,
          pendingReviews: Array.isArray(reviews)
            ? reviews.filter((r: { approved: boolean }) => !r.approved).length
            : 0,
          unreadMessages: Array.isArray(messages)
            ? messages.filter((m: { read: boolean }) => !m.read).length
            : 0,
        });
      } catch {
        setStats({ products: 0, categories: 0, pendingReviews: 0, unreadMessages: 0 });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Products",
      value: stats?.products ?? 0,
      icon: Package,
      href: "/admin/products",
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Categories",
      value: stats?.categories ?? 0,
      icon: FolderOpen,
      href: "/admin/categories",
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Pending Reviews",
      value: stats?.pendingReviews ?? 0,
      icon: Star,
      href: "/admin/reviews",
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Unread Messages",
      value: stats?.unreadMessages ?? 0,
      icon: Mail,
      href: "/admin/messages",
      color: "text-rose-600 bg-rose-50",
    },
  ];

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 text-xs md:text-sm mt-1">
          Welcome back to Orit&apos;s Fashion admin panel.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white border border-stone-200 p-4 md:p-6 active:bg-stone-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`p-1.5 md:p-2 rounded ${card.color}`}>
                  <Icon size={16} className="md:hidden" />
                  <Icon size={20} className="hidden md:block" />
                </div>
                <TrendingUp size={14} className="text-stone-300" />
              </div>
              {loading ? (
                <div className="h-6 md:h-8 w-12 md:w-16 bg-stone-100 animate-pulse rounded" />
              ) : (
                <p className="text-2xl md:text-3xl font-semibold text-stone-900">
                  {card.value}
                </p>
              )}
              <p className="text-xs md:text-sm text-stone-500 mt-1">{card.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        <div className="bg-white border border-stone-200 p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-stone-900 mb-3 md:mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2 md:space-y-3">
            <Link
              href="/admin/products/new"
              className="block p-3 md:p-4 border border-stone-100 active:border-gold-300 active:bg-gold-50/50 transition-colors"
            >
              <p className="text-sm font-medium text-stone-900">
                Add New Product
              </p>
              <p className="text-xs text-stone-500 mt-0.5 md:mt-1">
                Upload a new product to the catalog
              </p>
            </Link>
            <Link
              href="/admin/gallery"
              className="block p-3 md:p-4 border border-stone-100 active:border-gold-300 active:bg-gold-50/50 transition-colors"
            >
              <p className="text-sm font-medium text-stone-900">
                Update Gallery
              </p>
              <p className="text-xs text-stone-500 mt-0.5 md:mt-1">
                Add new images to the gallery
              </p>
            </Link>
            <Link
              href="/admin/reviews"
              className="block p-3 md:p-4 border border-stone-100 active:border-gold-300 active:bg-gold-50/50 transition-colors"
            >
              <p className="text-sm font-medium text-stone-900">
                Moderate Reviews
              </p>
              <p className="text-xs text-stone-500 mt-0.5 md:mt-1">
                Approve or reject client reviews
              </p>
            </Link>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold text-stone-900 mb-3 md:mb-4">
            Getting Started
          </h2>
          <div className="space-y-3 text-sm text-stone-600">
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-medium shrink-0">
                1
              </span>
              <p className="text-xs md:text-sm">
                Start by creating <strong>categories</strong> for your products
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-medium shrink-0">
                2
              </span>
              <p className="text-xs md:text-sm">
                Add <strong>products</strong> with images, descriptions, and pricing
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-medium shrink-0">
                3
              </span>
              <p className="text-xs md:text-sm">
                Upload images to the <strong>gallery</strong> to showcase your work
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="w-6 h-6 bg-gold-100 text-gold-700 flex items-center justify-center text-xs font-medium shrink-0">
                4
              </span>
              <p className="text-xs md:text-sm">
                Manage client <strong>reviews</strong> and <strong>messages</strong> as they come in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
