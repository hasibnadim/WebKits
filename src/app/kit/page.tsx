"use client";
import { useState, useMemo } from "react";
import applications, { CATEGORY_META, type KitCategory } from "@/lib/applications";
import Link from "next/link";
import { Search, Grid3X3, Layers, Wrench, ArrowUpRight } from "lucide-react";
import { Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const categoryIcons: Record<KitCategory, typeof Layers> = {
  "General Kit": Layers,
  "Conversion Kit": Grid3X3,
  "Developer Suite": Wrench,
};

const Page = () => {
  const [selected, setSelected] = useState<"all" | KitCategory>("all");
  const [query, setQuery] = useState("");

  const categories = Object.keys(applications) as KitCategory[];
  const toolCount = Object.values(applications).reduce((n, tools) => n + tools.length, 0);

  const filtered = useMemo(() => {
    let list =
      selected === "all"
        ? Object.entries(applications)
        : Object.entries(applications).filter(([cat]) => cat === selected);

    if (query) {
      const q = query.toLowerCase();
      return list
        .map(([cat, tools]) => [
          cat,
          tools.filter(
            (t) =>
              t.name.toLowerCase().includes(q) ||
              t.description.toLowerCase().includes(q) ||
              cat.toLowerCase().includes(q),
          ),
        ] as [KitCategory, typeof tools])
        .filter(([, tools]) => tools.length > 0);
    }
    return list as [KitCategory, (typeof applications)[KitCategory]][];
  }, [selected, query]);

  const visibleCount = filtered.reduce((n, [, tools]) => n + tools.length, 0);

  return (
    <div className="futuristic-surface min-h-screen text-[var(--futuristic-ink)]">
      <div className="border-b border-slate-200/80 bg-white/55 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:py-6">
          <div>
            <h1 className={`${display.className} text-2xl font-bold tracking-tight text-slate-900 md:text-3xl`}>
              Kit Index
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              <span className="tabular-nums text-teal-700">{visibleCount}</span>
              {" of "}
              <span className="tabular-nums">{toolCount}</span> tools
            </p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Find a tool…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-50"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200/80 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:border-b-0 md:border-r md:border-slate-200/80">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none md:flex-col md:gap-0 md:overflow-visible md:px-0 md:py-6 [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              type="button"
              onClick={() => setSelected("all")}
              className={`shrink-0 border px-3 py-2 text-left text-sm font-medium transition-colors md:border-0 md:border-l-2 md:px-5 ${
                selected === "all"
                  ? "border-slate-900 bg-slate-900 text-white md:border-l-teal-500 md:bg-teal-50/80 md:text-teal-900"
                  : "border-slate-200 bg-white/70 text-slate-600 hover:border-teal-300 hover:text-teal-700 md:border-l-transparent md:bg-transparent md:hover:border-l-teal-300 md:hover:bg-white/50"
              }`}
            >
              All kits
            </button>
            {categories.map((cat) => {
              const Icon = categoryIcons[cat];
              const count = applications[cat].length;
              const active = selected === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelected(cat)}
                  className={`shrink-0 border px-3 py-2 text-left transition-colors md:border-0 md:border-l-2 md:px-5 md:py-3 ${
                    active
                      ? "border-slate-900 bg-slate-900 text-white md:border-l-teal-500 md:bg-teal-50/80 md:text-teal-900"
                      : "border-slate-200 bg-white/70 text-slate-600 hover:border-teal-300 hover:text-teal-700 md:border-l-transparent md:bg-transparent md:hover:border-l-teal-300 md:hover:bg-white/50"
                  }`}
                >
                  <span className="flex items-center gap-2 md:gap-3">
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-teal-300 md:text-teal-600" : "text-slate-400"}`} />
                    <span className="min-w-0">
                      <span className={`${display.className} block text-sm font-medium`}>{cat}</span>
                      <span className={`hidden text-[11px] md:block ${active ? "text-teal-700/80" : "text-slate-400"}`}>
                        {count} tools
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="min-w-0 px-4 py-6 md:px-8 md:py-8">
          {filtered.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <Search className="mb-3 h-9 w-9 text-slate-300" />
              <p className="font-medium text-slate-500">No tools match &quot;{query}&quot;</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelected("all");
                }}
                className="mt-3 text-sm font-medium text-teal-700 hover:text-teal-600"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map(([category, tools]) => {
                const meta = CATEGORY_META[category];
                return (
                  <section key={category} className="scroll-mt-24">
                    <div className="mb-4 flex items-end justify-between gap-4 border-b border-slate-200/90 pb-3">
                      <div>
                        <div className="flex items-baseline gap-3">
                          <span className={`${display.className} text-xs font-medium tabular-nums text-teal-600`}>
                            {meta.code}
                          </span>
                          <h2 className={`${display.className} text-xl font-semibold text-slate-900`}>
                            {category}
                          </h2>
                        </div>
                        {!query && (
                          <p className="mt-1 text-sm text-slate-500">{meta.desc}</p>
                        )}
                      </div>
                      <span className="shrink-0 text-xs tabular-nums text-slate-400">
                        {tools.length}
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {tools.map((tool, i) => {
                        const className =
                          "group relative flex min-h-[132px] flex-col justify-between border border-slate-200/90 bg-white/75 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50/40";
                        const content = (
                          <>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex h-10 w-10 items-center justify-center bg-slate-950 text-teal-300 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                                <tool.icon className="h-5 w-5" />
                              </div>
                              <span className="text-[11px] tabular-nums text-slate-300 transition-colors group-hover:text-teal-600">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <div className="mt-6 flex items-end justify-between gap-2">
                              <div>
                                <h3 className={`${display.className} text-sm font-semibold leading-snug text-slate-900 group-hover:text-teal-900`}>
                                  {tool.name}
                                </h3>
                                <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{tool.description}</p>
                              </div>
                              <ArrowUpRight className="mb-0.5 h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-600" />
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
                  </section>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Page;
