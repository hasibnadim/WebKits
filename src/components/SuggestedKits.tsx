"use client";
import Link from "next/link";
import { getAllTools } from "@/lib/applications";
import { ArrowUpRight } from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function SuggestedKits({
  currentId,
  category,
}: {
  currentId?: string;
  category?: string;
}) {
  const all = getAllTools();
  const sameCategory = all.filter(
    (t) => t.category === category && t.id !== currentId,
  );
  const others = all.filter(
    (t) => t.category !== category && t.id !== currentId,
  );
  const suggestions = [...sameCategory, ...others].slice(0, 4);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8 border-t border-slate-200/90 pt-6">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 className={`${display.className} text-sm font-semibold text-slate-900`}>
            Related kits
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">Continue with another tool</p>
        </div>
        <Link
          href="/kit"
          className="text-xs font-medium text-teal-700 transition-colors hover:text-teal-600"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {suggestions.map((tool) => {
          const className =
            "group flex min-h-[96px] flex-col justify-between border border-slate-200/90 bg-white/70 p-3 transition-all hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50/40";
          const content = (
            <>
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-8 w-8 items-center justify-center bg-slate-950 text-teal-300 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <tool.icon className="h-3.5 w-3.5" />
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-teal-600" />
              </div>
              <div>
                <p className={`${display.className} truncate text-xs font-semibold text-slate-900`}>
                  {tool.name}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-400">{tool.category}</p>
              </div>
            </>
          );

          if (tool.external) {
            return (
              <a
                key={tool.id}
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={tool.id} href={tool.link} className={className}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
