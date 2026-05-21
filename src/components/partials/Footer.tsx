import { Package } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="backdrop-blur-xl bg-white/95 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          {/* Brand */}
          <div className="flex flex-col gap-2 items-start">
            <div className="flex items-center justify-center gap-2">
              <Package className="w-3 h-3 text-white bg-gradient-to-br from-purple-600 to-blue-600 rounded-md" />
              <span className="font-semibold text-xs text-slate-900">
                WebKits
              </span>
            </div>
            <span className="text-xs text-slate-600">
              Free online tools for developers and creators
            </span>
          </div>
          {/* Info Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/about"
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </div>
          {/* Copyright */}
          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <span>
              Developed and Maintained By{" "}
              <a
                href="https://www.linkedin.com/in/hasibnadim"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline underline-offset-2"
              >
                H.Nadim
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
