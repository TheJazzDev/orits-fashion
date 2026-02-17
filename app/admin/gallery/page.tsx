"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "@/app/components/ImageUpload";

interface GalleryItem {
  id: string;
  url: string;
  publicId: string | null;
  title: string | null;
  description: string | null;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [newImages, setNewImages] = useState<
    { url: string; publicId: string }[]
  >([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) setImages(await res.json());
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async () => {
    if (newImages.length === 0) return;
    setSaving(true);

    try {
      for (const img of newImages) {
        await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: img.url,
            publicId: img.publicId,
            title: title || null,
            description: description || null,
          }),
        });
      }
      toast.success("Images added to gallery!");
      setNewImages([]);
      setTitle("");
      setDescription("");
      setShowUpload(false);
      fetchImages();
    } catch {
      toast.error("Failed to upload images");
    } finally {
      setSaving(false);
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Delete this image from the gallery?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.id !== id));
        toast.success("Image deleted");
      }
    } catch {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Gallery</h1>
          <p className="text-stone-500 text-sm mt-1">
            Manage your gallery images
          </p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white text-sm hover:bg-stone-800 transition-colors"
        >
          <Plus size={16} />
          Add Images
        </button>
      </div>

      {showUpload && (
        <div className="bg-white border border-stone-200 p-6 mb-8 space-y-4">
          <h2 className="text-sm font-medium text-stone-900 uppercase tracking-wider">
            Upload New Images
          </h2>
          <ImageUpload images={newImages} onChange={setNewImages} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-500 mb-1">
                Title (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1">
                Description (optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 border border-stone-200 text-sm focus:border-gold-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
          <button
            onClick={handleUpload}
            disabled={newImages.length === 0 || saving}
            className="px-6 py-2.5 bg-stone-900 text-white text-sm hover:bg-stone-800 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Save to Gallery"}
          </button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-stone-100 animate-pulse"
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 bg-white border border-stone-200">
          <h3 className="text-lg font-medium text-stone-900 mb-2">
            Gallery is empty
          </h3>
          <p className="text-stone-500 text-sm">
            Upload images to showcase your work.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group aspect-square">
              <Image
                src={image.url}
                alt={image.title || "Gallery"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <button
                  onClick={() => deleteImage(image.id)}
                  className="p-2 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              {image.title && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="text-white text-xs">{image.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
