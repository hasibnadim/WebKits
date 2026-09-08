"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, Copy, Check, Minus, ArrowRight, Calculator } from "lucide-react";
import { toast } from "sonner";
import JsonToTS from "json-to-ts";

function getByteSize(str: string) {
  return new Blob([str]).size;
}

function isValidJson(str: string) {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" && parsed !== null;
  } catch {
    return false;
  }
}

function isValidJsObject(str: string) {
  try {
    // eslint-disable-next-line no-eval
    const obj = eval("(" + str + ")");
    return typeof obj === "object" && obj !== null;
  } catch {
    return false;
  }
}

function toTypeScriptInterface(obj: unknown): string {
  let result = "";
  JsonToTS(obj).forEach((typeInterface) => {
    result += typeInterface + "\n";
  });
  return result;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} bytes`;
  const units = ["KB", "MB", "GB", "TB"];
  let i = -1;
  do {
    bytes = bytes / 1024;
    i++;
  } while (bytes >= 1024 && i < units.length - 1);
  return `${bytes.toFixed(2)} ${units[i]}`;
}

function roughSizeOfObject(object: unknown, visited = new Set()): number {
  if (object === null || object === undefined) return 0;
  if (visited.has(object)) return 0;
  visited.add(object);
  let bytes = 0;
  switch (typeof object) {
    case "number":
      bytes += 8;
      break;
    case "string":
      bytes += object.length * 2;
      break;
    case "boolean":
      bytes += 4;
      break;
    case "object":
      if (Array.isArray(object)) {
        for (const item of object) {
          bytes += roughSizeOfObject(item, visited);
        }
      } else {
        for (const key in object as Record<string, unknown>) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            bytes += key.length * 2;
            bytes += roughSizeOfObject((object as Record<string, unknown>)[key], visited);
          }
        }
      }
      break;
    default:
      break;
  }
  return bytes;
}

const JsonSizeCalculator = () => {
  const [input, setInput] = useState("");
  const [tsInterface, setTsInterface] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const isJson = isValidJson(input);
  const isJsObj = !isJson && isValidJsObject(input);
  const charLength = input.length;
  const byteSize = getByteSize(input);
  let objectSize = 0;
  if (isJsObj) {
    try {
      // eslint-disable-next-line no-eval
      const obj = eval("(" + input + ")");
      objectSize = roughSizeOfObject(obj);
    } catch {
      /* ignore */
    }
  }

  const handleMinify = () => {
    try {
      setInput(JSON.stringify(JSON.parse(input)));
      toast.success("JSON minified successfully!");
    } catch {
      toast.error("Failed to minify JSON");
    }
  };

  const handleGenerateInterface = () => {
    setError("");
    try {
      let obj;
      if (isJson) {
        obj = JSON.parse(input);
      } else if (isJsObj) {
        // eslint-disable-next-line no-eval
        obj = eval("(" + input + ")");
      } else {
        setError("Input is not valid JSON or JS object.");
        setTsInterface("");
        return;
      }
      setTsInterface(toTypeScriptInterface(obj));
      toast.success("TypeScript interface generated!");
    } catch {
      setError("Failed to generate interface.");
      setTsInterface("");
      toast.error("Failed to generate interface");
    }
  };

  const handleConvertToJson = () => {
    setError("");
    try {
      // eslint-disable-next-line no-eval
      const obj = eval("(" + input + ")");
      setInput(JSON.stringify(obj, null, 2));
      toast.success("Converted to JSON!");
    } catch {
      setError("Failed to convert JS object to JSON.");
      toast.error("Failed to convert to JSON");
    }
  };

  const handleConvertToJsObject = () => {
    setError("");
    try {
      const obj = JSON.parse(input);
      setInput(
        JSON.stringify(obj, null, 2)
          .replace(/"([^("]+)":/g, "$1:")
          .replace(/"/g, "'"),
      );
      toast.success("Converted to JS object!");
    } catch {
      setError("Failed to convert JSON to JS object.");
      toast.error("Failed to convert to JS object");
    }
  };

  const copyInterface = async () => {
    if (!tsInterface) return;
    try {
      await navigator.clipboard.writeText(tsInterface);
      setCopied(true);
      toast.success("Interface copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy interface");
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <div className="flex h-8 w-8 items-center justify-center bg-slate-950 text-teal-300">
            <Code className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-slate-900">Input Data</span>
        </div>

        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={12}
          placeholder="Paste your string, JSON, or JS object here..."
          className="font-mono text-sm border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:ring-teal-50"
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="border border-slate-200 bg-teal-50/50 p-3 text-center">
            <div className="text-lg font-bold text-teal-700">{charLength}</div>
            <div className="text-xs text-slate-500">Characters</div>
          </div>
          <div className="border border-slate-200 bg-slate-50 p-3 text-center">
            <div className="text-lg font-bold text-slate-800">{formatBytes(byteSize)}</div>
            <div className="text-xs text-slate-500">Size</div>
          </div>
        </div>

        {isJsObj && (
          <div className="border border-slate-200 bg-white p-3 text-center">
            <div className="text-lg font-bold text-teal-800">{formatBytes(objectSize)}</div>
            <div className="text-xs text-slate-500">Object Size (approx)</div>
          </div>
        )}

        {(isJson || isJsObj) && (
          <div className="flex flex-wrap gap-2">
            {isJson && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMinify}
                className="h-8 border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50"
              >
                <Minus className="mr-1 h-3 w-3" />
                Minify
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateInterface}
              className="h-8 border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50"
            >
              <Code className="mr-1 h-3 w-3" />
              Generate TS
            </Button>
            {isJsObj && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleConvertToJson}
                className="h-8 border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50"
              >
                <ArrowRight className="mr-1 h-3 w-3" />
                To JSON
              </Button>
            )}
            {isJson && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleConvertToJsObject}
                className="h-8 border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50"
              >
                <ArrowRight className="mr-1 h-3 w-3" />
                To JS
              </Button>
            )}
          </div>
        )}

        {error && (
          <div className="border border-red-200 bg-red-50 p-2 text-sm text-red-600">{error}</div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <div className="flex h-8 w-8 items-center justify-center bg-slate-950 text-teal-300">
            <Calculator className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-slate-900">TypeScript Interface</span>
        </div>

        {tsInterface ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Generated Interface</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyInterface}
                className="h-8 w-8 p-0 text-slate-400 hover:text-teal-600"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Textarea
              value={tsInterface}
              readOnly
              rows={16}
              className="resize-none border border-slate-200 bg-slate-50 font-mono text-sm text-slate-800"
            />
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center border border-dashed border-slate-200 bg-slate-50/50 py-12 text-center">
            <Code className="mb-3 h-10 w-10 text-slate-300" />
            <p className="max-w-xs text-sm text-slate-400">
              Enter valid JSON or JS object to generate TypeScript interface
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonSizeCalculator;
