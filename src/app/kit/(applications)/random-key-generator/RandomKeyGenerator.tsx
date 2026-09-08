"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Key, Copy, Check, RefreshCw, Shield } from "lucide-react";
import { toast } from "sonner";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generateRandomKey(
  length: number,
  opts: { special: boolean; lower: boolean; upper: boolean; noDigits: boolean },
) {
  let charset = "";
  if (!opts.noDigits) charset += DIGITS;
  if (opts.lower && !opts.upper) charset += LOWER;
  else if (opts.upper && !opts.lower) charset += UPPER;
  else if (opts.lower && opts.upper) charset += LOWER + UPPER;
  if (opts.special) charset += SPECIAL;
  if (!opts.lower && !opts.upper) charset += LOWER + UPPER;
  if (charset.length === 0) charset = LOWER + UPPER + DIGITS + SPECIAL;
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (x) => charset[x % charset.length]).join("");
}

const RandomKeyGenerator = () => {
  const [length, setLength] = useState(32);
  const [key, setKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [special, setSpecial] = useState(true);
  const [lower, setLower] = useState(false);
  const [upper, setUpper] = useState(false);
  const [noDigits, setNoDigits] = useState(false);
  const [warning, setWarning] = useState("");

  const handleGenerate = () => {
    if (length < 6 || length > 512) {
      setWarning("Key length must be between 6 and 512.");
      return;
    }
    setWarning("");
    setKey(generateRandomKey(length, { special, lower, upper, noDigits }));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!key) return;
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      toast.success("Key copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy key");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <div className="flex h-8 w-8 items-center justify-center bg-slate-950 text-teal-300">
          <Shield className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold text-slate-900">Generate Secure Key</span>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="length" className="whitespace-nowrap text-sm font-medium text-slate-700">
          Key Length:
        </label>
        <Input
          id="length"
          type="number"
          min={6}
          max={512}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="h-10 w-24 border border-slate-200 bg-white text-sm text-slate-900 focus:border-teal-400 focus:ring-teal-50"
        />
        <span className="text-xs text-slate-400">(6-512)</span>
      </div>

      {warning && (
        <div className="border border-red-200 bg-red-50 p-2 text-sm text-red-700">{warning}</div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Special characters", checked: special, onChange: setSpecial },
          { label: "Lowercase only", checked: lower, onChange: setLower },
          { label: "Uppercase only", checked: upper, onChange: setUpper },
          { label: "No digits", checked: noDigits, onChange: setNoDigits },
        ].map((opt) => (
          <label
            key={opt.label}
            className="flex cursor-pointer items-center gap-2 border border-slate-200 bg-white p-2.5 hover:bg-teal-50/40"
          >
            <input
              type="checkbox"
              checked={opt.checked}
              onChange={(e) => opt.onChange(e.target.checked)}
              className="accent-teal-600"
            />
            <span className="text-sm text-slate-800">{opt.label}</span>
          </label>
        ))}
      </div>

      <Button
        onClick={handleGenerate}
        className="h-10 w-full bg-slate-950 font-semibold text-teal-300 hover:bg-teal-600 hover:text-white"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Generate Key
      </Button>

      {key && (
        <div className="border border-slate-200 bg-slate-50/80 p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-slate-600">Generated Key</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0 text-slate-500 hover:text-teal-600"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Textarea
            value={key}
            readOnly
            rows={3}
            className="resize-none border-0 bg-white font-mono text-sm text-slate-900"
          />
        </div>
      )}

      <div className="border border-slate-200 bg-white p-4">
        <div className="flex items-start gap-3">
          <Key className="mt-0.5 h-4 w-4 text-teal-600" />
          <div>
            <h3 className="mb-1 text-sm font-semibold text-slate-900">Security Features</h3>
            <ul className="space-y-1 text-xs text-slate-600">
              <li>• Uses cryptographically secure random number generation</li>
              <li>• Configurable character sets for different use cases</li>
              <li>• Supports lengths from 6 to 512 characters</li>
              <li>• Perfect for API keys, passwords, and tokens</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomKeyGenerator;
