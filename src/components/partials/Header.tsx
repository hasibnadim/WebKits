"use client";
import { DraftingCompass, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Playwrite_US_Modern, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const playWrite = Playwrite_US_Modern({
  weight: ["400"],
});

const nav = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const navLinks = [
  { href: "/kit", label: "Kits" },
  { href: "/about", label: "About" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileMode(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[#f8fbfd]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden border border-teal-500/30 bg-slate-950">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.45),transparent_65%)]" />
            <DraftingCompass className="relative h-3.5 w-3.5 text-teal-300" />
          </span>
          <span
            className={`${playWrite.className} text-lg tracking-tight text-slate-900 transition-colors group-hover:text-teal-700`}
          >
            WebKits
          </span>
        </Link>

        {!isMobileMode && (
          <nav className={`${nav.className} hidden items-center gap-1 md:flex`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-teal-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {isMobileMode && (
          <div className="relative md:hidden">
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-white/70 text-slate-700 transition-colors hover:border-teal-300 hover:text-teal-700"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            {isMobileMenuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close menu overlay"
                  className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[1px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <div
                  className={`${nav.className} absolute right-0 top-full z-50 mt-2 w-44 border border-slate-200 bg-white/95 p-1.5 shadow-sm backdrop-blur-xl`}
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
