"use client";
import Link from "next/link";
import applications from "@/lib/applications";
import { ArrowRight, Layers, Grid3X3, Wrench } from "lucide-react";

const categoryIcons: Record<string, typeof Layers> = {
  "General Kit": Layers,
  "Conversion Kit": Grid3X3,
  "Developer Suite": Wrench,
};

export default function SuggestedKits({
  currentName,
  category,
}: {
  currentName: string;
  category?: string;
}) {
  const all = Object.entries(applications).flatMap(([cat, tools]) =>
    tools.map((t) => ({ ...t, category: cat })),
  );

  const sameCategory = all.filter((t) => t.category === category && t.name !== currentName);
  const others = all.filter((t) => t.category !== category && t.name !== currentName);

  const suggestions = [...sameCategory, ...others].slice(0, 4);

  if (suggestions.length === 0) return null;

  return (
    <div className="border-t border-gray-100 mt-4 pt-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Related Tools</h3>
          <p className="text-xs text-gray-500 mt-0.5">You might also find these useful</p>
        </div>
        <Link
          href="/kit"
          className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {suggestions.map((tool) => {
          const CatIcon = tool.icon;
          return (
            <Link
              key={tool.name}
              href={tool.link}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm hover:bg-blue-50/20 transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 shrink-0">
                <CatIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-900 truncate">{tool.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{tool.category}</p>
              </div>
              <ArrowRight className="h-3 w-3 text-gray-300 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}