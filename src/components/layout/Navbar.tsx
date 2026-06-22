"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button, Dropdown, Label } from "@heroui/react";
import { Menu, X, Leaf } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useRole } from "@/hooks/useRole";
import { CartDrawer } from "@/components/layout/CartDrawer";


const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { role } = useRole();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const dashboardHref = role === "admin" ? "/admin" : "/user";

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: dashboardHref, label: "Dashboard" },
    { href: "/user/impact", label: "Impact" },
    { href: "/user/profile", label: "Profile" },
    { href: "/about", label: "About" },
  ];

  const links = isSignedIn ? loggedInLinks : loggedOutLinks;

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Leaf className="h-6 w-6 text-accent" />
          <span className="text-lg">EcoNest</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          
          <ThemeToggle />
          {isSignedIn && <CartDrawer />}

          {isSignedIn ? (
            <Dropdown>
              <Button variant="ghost" isIconOnly aria-label="Account menu" className="rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
                  {user?.firstName?.[0]?.toUpperCase() ?? "U"}
                </div>
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu>
                  <Dropdown.Item id="profile" textValue="Profile" onAction={() => router.push("/user/profile")}>
                    <Label>Profile</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="dashboard" textValue="Dashboard" onAction={() => router.push(dashboardHref)}>
                    <Label>Dashboard</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="signout" textValue="Sign out" onAction={handleSignOut}>
                    <Label>Sign out</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <>
              <Button variant="ghost" onPress={() => router.push("/login")}>
                Sign In
              </Button>
              <Button variant="primary" onPress={() => router.push("/register")}>
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          className="flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-surface-secondary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
    <ThemeToggle />
    {isSignedIn && <CartDrawer />}
  </div>
              {!isSignedIn && (
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onPress={() => router.push("/login")}>
                    Sign In
                  </Button>
                  <Button size="sm" variant="primary" onPress={() => router.push("/register")}>
                    Get Started
                  </Button>
                </div>
              )}
              {isSignedIn && (
                <Button size="sm" variant="ghost" onPress={handleSignOut}>
                  Sign out
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}