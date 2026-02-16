"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ImageUpload from "@/app/components/ImageUpload";
import toast from "react-hot-toast";
import { slugify } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface UploadedImage {
  url: string;
  publicId: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    categoryId: "",
    featured: false,
    published: true,
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});

    if (editId) {
      fetch(`/api/products/${editId}`)
        .then((r) => r.json())
        .then((product) => {
          setForm({
            name: product.name,
            slug: product.slug,
            description: product.description || "",
            price: product.price?.toString() || "",
            categoryId: product.categoryId || "",
            featured: product.featured,
            published: product.published,
          });
          setImages(
            product.images?.map((img: { url: string; publicId: string }) => ({
              url: img.url,
              publicId: img.publicId || "",
            })) || []
          );
        })
        .catch(() => toast.error("Failed to load product"));
    }
  }, [editId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && !editId ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      ...form,
      price: form.price ? parseFloat(form.price) : null,
      categoryId: form.categoryId || null,
      images: images.map((img, i) => ({
        url: img.url,
        publicId: img.publicId,
        order: i,
      })),
    };

    try {
      const url = editId ? `/api/products/${editId}` : "/api/products";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(editId ? "Product updated!" : "Product created!");
        router.push("/admin/products");
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-700 transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
        <h1 className="text-2xl font-semibold text-stone-900">
          {editId ? "Edit Product" : "New Product"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        <div className="bg-white border border-stone-200 p-6 space-y-6">
          <h2 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-stone-500 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-2">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors bg-stone-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-stone-500 mb-2">
                Price (NGN)
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-2">
                Category
              </label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors bg-white"
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-gold-500"
              />
              <span className="text-sm text-stone-700">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="w-4 h-4 accent-gold-500"
              />
              <span className="text-sm text-stone-700">Published</span>
            </label>
          </div>
        </div>

        <div className="bg-white border border-stone-200 p-6 space-y-4">
          <h2 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
            Product Images
          </h2>
          <ImageUpload images={images} onChange={setImages} />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-stone-900 text-white text-sm hover:bg-stone-800 disabled:opacity-50 transition-colors"
          >
            {loading
              ? "Saving..."
              : editId
                ? "Update Product"
                : "Create Product"}
          </button>
          <Link
            href="/admin/products"
            className="px-8 py-3 border border-stone-300 text-stone-600 text-sm hover:bg-stone-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
