"use client";
import {
  DraftingCompass,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Playwrite_US_Modern } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const playWrite = Playwrite_US_Modern({
  weight: ["400"],
});
const navLinks = [

  {
    href: "/kit",
    icon: DraftingCompass,
    label: "Kits",
  },
];
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMode, setIsMobileMode] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileMode(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 backdrop-blur-xl bg-white/90 text-slate-900",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 px-2 md:px-4 lg:px-1">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 group">
            <span
              className={`${playWrite.className} font-bold text-lg bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent`}
            >
              WebKits
            </span>
          </Link>

          {/* Mobile Nav */}
          <div className="flex items-center gap-1 md:gap-3"> 
            {!isMobileMode && (
              <div className="hidden md:flex">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="ghost"
                    className="hover:text-blue-600"
                    aria-label={link.label}
                  >
                    <Link href={link.href}>
                      <link.icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  </Button>
                ))}
              </div>
            )}

            {isMobileMode && (
              <Popover
                open={isMobileMenuOpen}
                onOpenChange={setIsMobileMenuOpen}
              >
                <PopoverTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      asChild
                      variant="ghost"
                      className="flex gap-3 justify-start"
                      aria-label={link.label}
                    >
                      <Link href={link.href}>
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                      </Link>
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
