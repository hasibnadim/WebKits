"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Copy, Check, RefreshCw, Shield } from "lucide-react";
import { toast } from "sonner";

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';

function generateRandomKey(length: number, opts: { special: boolean; lower: boolean; upper: boolean; noDigits: boolean }) {
  let charset = '';
  if (!opts.noDigits) charset += DIGITS;
  if (opts.lower && !opts.upper) charset += LOWER;
  else if (opts.upper && !opts.lower) charset += UPPER;
  else if (opts.lower && opts.upper) charset += LOWER + UPPER;
  if (opts.special) charset += SPECIAL;
  if (!opts.lower && !opts.upper) charset += LOWER + UPPER; // fallback to all letters if none checked
  if (charset.length === 0) charset = LOWER + UPPER + DIGITS + SPECIAL;
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (x) => charset[x % charset.length]).join('');
}

const RandomKeyGenerator = () => {
  const [length, setLength] = useState(32);
  const [key, setKey] = useState('');
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
    if (key) {
      try {
        await navigator.clipboard.writeText(key);
        setCopied(true);
        toast.success('Key copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error('Failed to copy key');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-lg border border-slate-200">
              <Key className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-medium text-slate-900">Security Tools</span>
            </div>

            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-900 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Random Key Generator
            </h1>

            <p className="text-base text-slate-600">
              Generate secure random keys for your applications
            </p>
          </div>

          {/* Generator Card */}
          <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <div className="p-1.5 bg-gradient-to-r from-blue-100 to-indigo-200 rounded-lg">
                  <Shield className="h-4 w-4  text-blue-700" />
                </div>
                <span className="text-slate-900">Generate Secure Key</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Length Input */}
              <div className="flex items-center gap-3">
                <label htmlFor="length" className="text-sm font-medium whitespace-nowrap">Key Length:</label>
                <Input
                  id="length"
                  type="number"
                  min={6}
                  max={512}
                  value={length}
                  onChange={e => setLength(Number(e.target.value))}
                  className="w-24 h-10 text-sm border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 bg-white text-slate-900 placeholder:text-slate-400"
                />
                <span className="text-xs text-gray-400">(6-512)</span>
              </div>

              {warning && (
                <div className="text-red-700 text-sm bg-red-50 p-2 rounded-lg border border-red-200">{warning}</div>
              )}

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={special}
                    onChange={e => setSpecial(e.target.checked)}
                    className="rounded border-slate-300 text-blue-500 focus:ring-blue-500 bg-white"
                  />
                  <span className="text-sm text-slate-900">Special characters</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lower}
                    onChange={e => setLower(e.target.checked)}
                    className="rounded border-slate-300 text-blue-500 focus:ring-blue-500 bg-white"
                  />
                  <span className="text-sm text-slate-900">Lowercase only</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={upper}
                    onChange={e => setUpper(e.target.checked)}
                    className="rounded border-slate-300 text-blue-500 focus:ring-blue-500 bg-white"
                  />
                  <span className="text-sm text-slate-900">Uppercase only</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={noDigits}
                    onChange={e => setNoDigits(e.target.checked)}
                    className="rounded border-slate-300 text-blue-500 focus:ring-blue-500 bg-white"
                  />
                  <span className="text-sm text-slate-900">No digits</span>
                </label>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate Key
              </Button>

              {/* Generated Key */}
              {key && (
                <div className="space-y-3">
                  <div className="bg-white/50 p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-700">Generated Key</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-blue-400"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <Textarea
                      value={key}
                      readOnly
                      rows={3}
                      className="font-mono text-sm bg-white text-slate-900 border-0 resize-none"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Info */}
          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Security Features</h3>
                    <ul className="text-xs text-slate-700 space-y-1">
                      <li>• Uses cryptographically secure random number generation</li>
                      <li>• Configurable character sets for different use cases</li>
                      <li>• Supports lengths from 6 to 512 characters</li>
                      <li>• Perfect for API keys, passwords, and tokens</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomKeyGenerator; 