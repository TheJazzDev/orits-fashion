"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, Package } from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | null;
  featured: boolean;
  published: boolean;
  category: { name: string } | null;
  images: { url: string }[];
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) setProducts(await res.json());
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted");
      } else {
        toast.error("Failed to delete product");
      }
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !featured }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, featured: !featured } : p))
        );
      }
    } catch {
      toast.error("Failed to update product");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-stone-900">Products</h1>
          <p className="text-stone-500 text-xs md:text-sm mt-1">
            Manage your product catalog
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-stone-900 text-white text-xs md:text-sm active:bg-stone-700 transition-colors"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3 md:space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-white border border-stone-200 animate-pulse"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 md:py-20 bg-white border border-stone-200">
          <Package size={40} className="mx-auto text-stone-300 mb-4" />
          <h3 className="text-base md:text-lg font-medium text-stone-900 mb-2">
            No products yet
          </h3>
          <p className="text-stone-500 text-xs md:text-sm mb-6">
            Start by adding your first product to the catalog.
          </p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white text-sm active:bg-stone-700 transition-colors"
          >
            <Plus size={16} />
            Add Product
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Product
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Category
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Price
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-stone-100 shrink-0 relative overflow-hidden">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs">
                              N/A
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium text-stone-900">
                          {product.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-600">
                        {product.category?.name || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-600">
                        {product.price
                          ? new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            }).format(product.price)
                          : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            product.published ? "bg-emerald-500" : "bg-stone-300"
                          }`}
                        />
                        <span className="text-xs text-stone-500">
                          {product.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleFeatured(product.id, product.featured)}
                          className={`p-1.5 rounded transition-colors ${
                            product.featured
                              ? "text-gold-500 hover:text-gold-600"
                              : "text-stone-300 hover:text-gold-500"
                          }`}
                          title={product.featured ? "Remove from featured" : "Mark as featured"}
                        >
                          <Star size={16} className={product.featured ? "fill-current" : ""} />
                        </button>
                        <Link
                          href={`/admin/products/new?edit=${product.id}`}
                          className="p-1.5 text-stone-400 hover:text-stone-600 transition-colors"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-stone-200 p-3"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-stone-100 shrink-0 relative overflow-hidden">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs">
                        N/A
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {product.category?.name || "No category"}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-stone-600">
                        {product.price
                          ? new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            }).format(product.price)
                          : "No price"}
                      </span>
                      <div className="flex items-center gap-1">
                        <span
                          className={`inline-block w-1.5 h-1.5 rounded-full ${
                            product.published ? "bg-emerald-500" : "bg-stone-300"
                          }`}
                        />
                        <span className="text-[10px] text-stone-400">
                          {product.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 mt-2 pt-2 border-t border-stone-100">
                  <button
                    onClick={() => toggleFeatured(product.id, product.featured)}
                    className={`p-2 rounded active:opacity-70 ${
                      product.featured ? "text-gold-500" : "text-stone-300"
                    }`}
                  >
                    <Star size={16} className={product.featured ? "fill-current" : ""} />
                  </button>
                  <Link
                    href={`/admin/products/new?edit=${product.id}`}
                    className="p-2 text-stone-400 active:text-stone-600"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 text-stone-400 active:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
