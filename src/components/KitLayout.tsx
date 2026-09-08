"use client";
import SuggestedKits from "@/components/SuggestedKits";
import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { usePathname } from "next/navigation";
import { findToolByPath } from "@/lib/applications";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export default function KitLayout({
  children,
  title,
  description,
  category,
}: {
  children: ReactNode;
  /** Optional overrides — defaults resolve from the kit registry via pathname */
  title?: string;
  description?: string;
  category?: string;
}) {
  const pathname = usePathname();
  const tool = findToolByPath(pathname);

  const resolvedTitle = title ?? tool?.name ?? "Tool";
  const resolvedDescription = description ?? tool?.description ?? "";
  const resolvedCategory = category ?? tool?.category;
  const toolId = tool?.id;

  return (
    <div className="futuristic-surface min-h-screen text-[var(--futuristic-ink)]">
      <div className="border-b border-slate-200/80 bg-white/55 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-5 md:py-6">
          <Link
            href="/kit"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-teal-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kit Index
          </Link>
          <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
            <div>
              {resolvedCategory && (
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-teal-700">
                  {resolvedCategory}
                </p>
              )}
              <h1
                className={`${display.className} mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl`}
              >
                {resolvedTitle}
              </h1>
            </div>
            {resolvedDescription && (
              <p className="max-w-md text-sm text-slate-500">{resolvedDescription}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6 md:py-8">
        <div className="border border-slate-200/90 bg-white/75 p-4 md:p-6">{children}</div>
        <SuggestedKits currentId={toolId} category={resolvedCategory} />
      </div>
    </div>
  );
}
