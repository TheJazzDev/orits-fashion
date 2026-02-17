"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { slugify } from "@/lib/utils";
import ImageUpload from "@/app/components/ImageUpload";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  order: number;
  _count?: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });
  const [imageData, setImageData] = useState<
    { url: string; publicId: string }[]
  >([]);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) setCategories(await res.json());
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setForm({ name: "", slug: "", description: "" });
    setImageData([]);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (category: Category) => {
    setForm({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
    setImageData(category.image ? [{ url: category.image, publicId: "" }] : []);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body = {
      ...form,
      slug: form.slug || slugify(form.name),
      image: imageData[0]?.url || null,
    };

    try {
      const url = editingId
        ? `/api/categories/${editingId}`
        : "/api/categories";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(
          editingId ? "Category updated!" : "Category created!"
        );
        resetForm();
        fetchCategories();
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure? Products in this category will be uncategorized."))
      return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast.success("Category deleted");
      } else {
        toast.error("Failed to delete category");
      }
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && !editingId ? { slug: slugify(value) } : {}),
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-stone-900">Categories</h1>
          <p className="text-stone-500 text-xs md:text-sm mt-1">
            Organize your products into collections
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-stone-900 text-white text-xs md:text-sm active:bg-stone-700 transition-colors"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Add Category</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-stone-200 p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
              {editingId ? "Edit Category" : "New Category"}
            </h2>
            <button
              onClick={resetForm}
              className="text-stone-400 active:text-stone-600 p-1"
            >
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-stone-500 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-500 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors bg-stone-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={2}
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1">
                Cover Image
              </label>
              <ImageUpload
                images={imageData}
                onChange={setImageData}
                multiple={false}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 md:px-6 py-2.5 bg-stone-900 text-white text-sm active:bg-stone-700 disabled:opacity-50 transition-colors"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update"
                    : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-5 md:px-6 py-2.5 border border-stone-300 text-stone-600 text-sm active:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3 md:space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-white border border-stone-200 animate-pulse"
            />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 md:py-20 bg-white border border-stone-200">
          <h3 className="text-base md:text-lg font-medium text-stone-900 mb-2">
            No categories yet
          </h3>
          <p className="text-stone-500 text-xs md:text-sm">
            Create categories to organize your products.
          </p>
        </div>
      ) : (
        <div className="space-y-2 md:space-y-0">
          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-stone-200 p-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900">
                      {category.name}
                    </p>
                    {category.description && (
                      <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">
                        {category.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-stone-400">
                        /{category.slug}
                      </span>
                      <span className="text-xs text-stone-500">
                        {category._count?.products ?? 0} products
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => startEdit(category)}
                      className="p-2 text-stone-400 active:text-stone-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="p-2 text-stone-400 active:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white border border-stone-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Category
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Slug
                  </th>
                  <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Products
                  </th>
                  <th className="text-right text-xs font-medium text-stone-500 uppercase tracking-wider px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-stone-900">
                        {category.name}
                      </p>
                      {category.description && (
                        <p className="text-xs text-stone-400 mt-0.5">
                          {category.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-500">
                        {category.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-500">
                        {category._count?.products ?? 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEdit(category)}
                          className="p-1.5 text-stone-400 hover:text-stone-600 transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => deleteCategory(category.id)}
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
        </div>
      )}
    </div>
  );
}
