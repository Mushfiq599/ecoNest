"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Leaf, History, Users, Package, BarChart3, FileSearch, Settings, Menu, X } from "lucide-react";
import { useRole } from "@/hooks/useRole";

const userLinks = [
  { href: "/user", label: "Overview", icon: LayoutDashboard },
  { href: "/user/profile", label: "Profile", icon: User },
  { href: "/user/impact", label: "Impact", icon: Leaf },
  { href: "/user/ai-history", label: "AI History", icon: History },
];

const adminLinks = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/ai-logs", label: "AI Logs", icon: FileSearch },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <>
      <button
        className="fixed bottom-4 right-4 z-40 rounded-full bg-accent p-3 text-accent-foreground shadow-lg lg:hidden"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-border bg-surface pt-20 transition-transform lg:static lg:translate-x-0 lg:pt-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/70 hover:bg-surface-secondary"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}