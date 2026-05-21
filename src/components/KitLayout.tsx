"use client";
import SuggestedKits from "@/components/SuggestedKits";
import { ReactNode } from "react";

export default function KitLayout({
  children,
  title,
  description,
  category,
}: {
  children: ReactNode;
  title: string;
  description: string;
  category?: string;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 pb-4">
        <div className="text-center mb-2">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">{description}</p>
        </div>
        {children}
        <SuggestedKits currentName={title} category={category} />
      </div>
    </div>
  );
}