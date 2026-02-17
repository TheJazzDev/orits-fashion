"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ImageIcon,
  Star,
  Mail,
  ArrowLeft,
  LogOut,
  X,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          style={{ animation: "fade-overlay 0.2s ease-out" }}
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 w-64 bg-stone-900 text-stone-300 h-full flex flex-col shrink-0 transition-transform duration-200 ease-out md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 md:p-6 border-b border-stone-800 flex items-center justify-between">
          <Link
            href="/admin"
            className="font-heading text-lg md:text-xl text-white"
            onClick={onClose}
          >
            Orit&apos;s Admin
          </Link>
          <button
            onClick={onClose}
            className="md:hidden p-1 text-stone-400 active:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 md:py-6 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {links.map((link) => {
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-3 md:py-2.5 rounded text-sm transition-colors active:opacity-80 ${
                      isActive
                        ? "bg-gold-600 text-white"
                        : "text-stone-400 hover:text-white hover:bg-stone-800"
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-3 border-t border-stone-800 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 md:py-2.5 rounded text-sm text-stone-400 hover:text-white hover:bg-stone-800 active:opacity-80 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Site
          </Link>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-3 md:py-2.5 rounded text-sm text-stone-400 hover:text-red-400 hover:bg-stone-800 active:opacity-80 transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
