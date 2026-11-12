"use client";
import React, { useState, useEffect } from "react";
import { Maximize2, Minimize2, Copy, Check, Download, Share } from "lucide-react";
import { toast } from "sonner";

// Re-export for any legacy imports
export { languages } from "@/lib/languages";

interface ShowTextProps {
  text: string;
  language: string;
  id?: string | number;
}

const ShowText = ({ text, language, id }: ShowTextProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const lines = text.split("\n");

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => { });
      }
    } else {
      document.querySelector("#show-text")?.requestFullscreen().catch(() => { });
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      toast.success("Text copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast.error("Failed to copy text");
    }
  };

  const handleDownload = () => {
    try {
      const currentId =
        id ??
        (typeof window !== "undefined"
          ? window.location.pathname.split("/").filter(Boolean).pop()
          : "text");
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const monthdate = `${month}${date}`;
      const filename = `webkt_${currentId}_${monthdate}.txt`;

      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Downloaded as ${filename}`);
    } catch (err) {
      console.error("Failed to download text:", err);
      toast.error("Failed to download text");
    }
  };

  return (
    <div
      className={`m-0 flex min-h-screen w-screen flex-col items-stretch justify-start p-0 ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}
      style={isFullscreen ? { width: "100vw", height: "100vh" } : {}}
      id="show-text"
    >
      <div className="flex w-full items-center justify-between border-b border-slate-200 bg-white/90 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-tight text-slate-900">View Text</span>
          {id && <span className="font-mono text-[11px] text-slate-400">#{id}</span>}
        </div>
        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-7 items-center gap-1.5 border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 transition-colors hover:border-teal-400 hover:bg-slate-50 hover:text-teal-700"
            title="Copy text"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-teal-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-500" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex h-7 items-center gap-1.5 border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 transition-colors hover:border-teal-400 hover:bg-slate-50 hover:text-teal-700"
            title="Download text file"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Download</span>
          </button>
          <a
            className="inline-flex h-7 items-center gap-1.5 border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-700 transition-colors hover:border-teal-400 hover:bg-slate-50 hover:text-teal-700"
            title="Share New Text"
            href="/kit/share-text"
          >
            <Share className="h-3.5 w-3.5 text-slate-500" />
            <span>Share New Text</span>
          </a>

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
