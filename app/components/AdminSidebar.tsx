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
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-stone-900 text-stone-300 min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-stone-800">
        <Link href="/admin" className="font-heading text-xl text-white">
          Orit&apos;s Admin
        </Link>
      </div>

      <nav className="flex-1 py-6">
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
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
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
          className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Site
        </Link>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
