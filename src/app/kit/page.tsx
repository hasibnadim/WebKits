"use client";
import { useState, useMemo } from "react";
import applications from "@/lib/applications";
import Link from "next/link";
import { Search, Grid3X3, Layers, Wrench, ArrowRight } from "lucide-react";

const categoryMeta: Record<string, { icon: typeof Grid3X3; desc: string }> = {
  "General Kit": { icon: Layers, desc: "Everyday utilities for quick tasks" },
  "Conversion Kit": { icon: Grid3X3, desc: "Convert between formats and units" },
  "Developer Suite": { icon: Wrench, desc: "Tools built for developers" },
};

const Page = () => {
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");

  const allTools = useMemo(
    () => Object.entries(applications).flatMap(([cat, tools]) => tools.map((t) => ({ ...t, category: cat }))),
    [],
  );

  const filtered = useMemo(() => {
    let list =
      selected === "all"
        ? Object.entries(applications)
        : Object.entries(applications).filter(([cat]) => cat === selected);
    if (query) {
      return list.map(([cat, tools]) => [
        cat,
        tools.filter(
          (t) =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            cat.toLowerCase().includes(query.toLowerCase()),
        ),
      ] as [string, typeof tools]).filter(([, tools]) => tools.length > 0);
    }
    return list;
  }, [selected, query]) as [string, (typeof applications)["General Kit"][number][]][];

  const categories = Object.keys(applications);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Tools
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Professional utilities for everyday tasks
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 py-4 space-y-3">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              onClick={() => setSelected("all")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selected === "all"
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  selected === cat
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filtered.length === 0 && query && (
          <div className="text-center py-16">
            <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No tools found for &quot;{query}&quot;</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(([category, tools]) => {
            const meta = categoryMeta[category] || { icon: Layers, desc: "" };
            const Icon = meta.icon;
            return (
              <div key={category} className="sm:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{category}</h2>
                    {!query && <p className="text-xs text-gray-500 mt-0.5">{meta.desc}</p>}
                  </div>
                  <div className="ml-auto text-xs text-gray-400 tabular-nums">
                    {tools.length} tool{tools.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.link}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-sm hover:bg-blue-50/20 transition-all duration-200"
                    >
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors shrink-0">
                        <tool.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-700 transition-colors truncate">
                          {tool.name}
                        </h3>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;