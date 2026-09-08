"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const units = [
  { label: "Bit", value: "bit", factor: 1 / 8 },
  { label: "Byte", value: "byte", factor: 1 },
  { label: "Kilobyte (KB)", value: "kb", factor: 1024 },
  { label: "Megabyte (MB)", value: "mb", factor: 1024 * 1024 },
  { label: "Gigabyte (GB)", value: "gb", factor: 1024 * 1024 * 1024 },
  { label: "Terabyte (TB)", value: "tb", factor: 1024 ** 4 },
  { label: "Petabyte (PB)", value: "pb", factor: 1024 ** 5 },
];

function convert(value: number, from: string, to: string) {
  const fromUnit = units.find((u) => u.value === from);
  const toUnit = units.find((u) => u.value === to);
  if (!fromUnit || !toUnit) return 0;
  const bytes = value * fromUnit.factor;
  return bytes / toUnit.factor;
}

const ByteConverter = () => {
  const [input, setInput] = useState("1");
  const [from, setFrom] = useState("byte");
  const [to, setTo] = useState("kb");
  const [copied, setCopied] = useState(false);

  const result = convert(Number(input), from, to);
  const resultFormatted = result.toLocaleString("en-US", {
    maximumFractionDigits: 6,
    minimumFractionDigits: 0,
  });

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(
        `${resultFormatted} ${units.find((u) => u.value === to)?.label}`,
      );
      setCopied(true);
      toast.success("Result copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy result");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <div className="flex h-8 w-8 items-center justify-center bg-slate-950 text-teal-300">
          <Calculator className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold text-slate-900">Convert Units</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              type="number"
              value={input}
              min={0}
              onChange={(e) => setInput(e.target.value)}
              className="h-10 border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:ring-teal-50"
              placeholder="Enter value"
            />
          </div>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="h-10 w-40 border border-slate-200 bg-white text-sm text-slate-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white text-slate-900">
              {units.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center">
          <div className="flex h-8 w-8 items-center justify-center bg-teal-600 text-white">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm font-semibold text-slate-900">
            {resultFormatted}
          </div>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="h-10 w-40 border border-slate-200 bg-white text-sm text-slate-900">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-slate-200 bg-white text-slate-900">
              {units.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between border border-slate-200 bg-white p-4">
          <div>
            <p className="mb-1 text-xs text-slate-500">Result</p>
            <p className="font-mono text-base font-bold text-slate-900">
              {resultFormatted} {units.find((u) => u.value === to)?.label}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyResult}
            className="h-8 w-8 p-0 text-slate-500 hover:text-teal-600"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Quick Conversions</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {[
            { from: "1", fromUnit: "mb", to: "kb" },
            { from: "1", fromUnit: "gb", to: "mb" },
            { from: "1024", fromUnit: "kb", to: "mb" },
            { from: "1", fromUnit: "tb", to: "gb" },
          ].map((quick, index) => {
            const quickResult = convert(Number(quick.from), quick.fromUnit, quick.to);
            return (
              <div key={index} className="border border-slate-200 bg-white p-3 text-center">
                <p className="text-xs text-slate-500">
                  {quick.from} {units.find((u) => u.value === quick.fromUnit)?.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-teal-700">
                  = {quickResult.toLocaleString()} {units.find((u) => u.value === quick.to)?.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ByteConverter;
