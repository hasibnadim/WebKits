"use client";
import React, { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

// Re-export for any legacy imports
export { languages } from "@/lib/languages";

interface ShowTextProps {
  text: string;
  language: string;
}

const ShowText = ({ text, language }: ShowTextProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lines = text.split("\n");

  return (
    <div
      className={`m-0 flex min-h-screen w-screen flex-col items-stretch justify-start p-0 ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}
      style={isFullscreen ? { width: "100vw", height: "100vh" } : {}}
      id="show-text"
    >
      <div className="flex w-full items-center justify-between border-b border-slate-200 bg-white/90 px-3 py-2 backdrop-blur-sm">
        <span className="text-xs font-semibold tracking-tight text-slate-900">View Text</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase text-teal-700">{language}</span>
          <button
            aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            onClick={() => {
              if (isFullscreen) {
                document.exitFullscreen();
              } else {
                document.querySelector("#show-text")?.requestFullscreen();
              }
              setIsFullscreen(!isFullscreen);
            }}
            className="flex h-6 w-6 items-center justify-center transition-colors hover:bg-teal-50"
            type="button"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4 text-slate-600" />
            ) : (
              <Maximize2 className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex-1 overflow-auto" style={{ height: "calc(100vh - 40px)" }}>
        <pre className="m-0 whitespace-pre-wrap break-words p-4 font-mono text-[13px] leading-5 text-slate-800">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-10 shrink-0 select-none pr-4 text-right text-slate-300">
                {i + 1}
              </span>
              <span>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default ShowText;
