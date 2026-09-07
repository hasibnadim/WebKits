"use client";
import React, { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

export const languages = [
  { label: "Plain Text", value: "plaintext" },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "CSS", value: "css" },
  { label: "LESS", value: "less" },
  { label: "SCSS", value: "scss" },
  { label: "JSON", value: "json" },
  { label: "HTML", value: "html" },
  { label: "XML", value: "xml" },
  { label: "PHP", value: "php" },
  { label: "C#", value: "csharp" },
  { label: "C++", value: "cpp" },
  { label: "Razor", value: "razor" },
  { label: "Markdown", value: "markdown" },
  { label: "Diff", value: "diff" },
  { label: "Java", value: "java" },
  { label: "VB", value: "vb" },
  { label: "CoffeeScript", value: "coffeescript" },
  { label: "Handlebars", value: "handlebars" },
  { label: "Batch", value: "bat" },
  { label: "Pug", value: "pug" },
  { label: "F#", value: "fsharp" },
  { label: "Lua", value: "lua" },
  { label: "Powershell", value: "powershell" },
  { label: "Python", value: "python" },
  { label: "Ruby", value: "ruby" },
  { label: "SASS", value: "sass" },
  { label: "R", value: "r" },
  { label: "Objective-C", value: "objective-c" },
];

interface ShowTextProps {
  text: string;
  language: string;
}
const ShowText = ({ text, language }: ShowTextProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const lines = text.split("\n");

  return (
    <div
      className={`w-screen min-h-screen flex flex-col items-stretch justify-start p-0 m-0${isFullscreen ? " fixed inset-0 z-50 bg-white" : ""}`}
      style={isFullscreen ? { width: "100vw", height: "100vh" } : {}}
      id="show-text"
    >
      <div
        className="flex items-center justify-between w-full px-2 py-1 border-b"
        style={{ minHeight: 36 }}
      >
        <span className="text-xs font-semibold tracking-tight">
          View Text
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-400 uppercase">
            {language}
          </span>
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
            className="ml-2 p-1 rounded hover:bg-neutral-100 transition-colors"
            style={{
              height: 24,
              width: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            type="button"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-neutral-600" />
            ) : (
              <Maximize2 className="w-4 h-4 text-neutral-600" />
            )}
          </button>
        </div>
      </div>
      <div
        className="flex-1 w-full overflow-auto"
        style={{ height: isFullscreen ? "calc(100vh - 36px)" : "calc(100vh - 36px)" }}
      >
        <pre className="m-0 p-4 text-[13px] leading-5 font-mono whitespace-pre-wrap break-words">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none text-neutral-300 text-right pr-4 w-10 shrink-0">
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
