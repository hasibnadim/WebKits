"use client"
import React, { useState, useCallback, useEffect } from "react";
import { ClipboardCheck, Fullscreen, GitCompare } from "lucide-react";
import { DiffEditor, loader } from '@monaco-editor/react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "@/lib/languages";
import KitLayout from "@/components/KitLayout";

loader.config({
  paths: {
    vs: '/monaco/vs',
  },
});

export default function TextDiffChecker() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [language, setLanguage] = useState('plaintext')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [editorError, setEditorError] = useState(false)

  const handleFullscreenToggle = useCallback(() => {
    const diffViewer = document.getElementById('diff-viewer');
    if (diffViewer) {
      if (isFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        diffViewer.requestFullscreen();
        setIsFullscreen(true);
      }
    }
  }, [isFullscreen]);

  useEffect(() => {
    setEditorError(false);
  }, [oldText, newText]);

  useEffect(() => {
    return () => {
      setEditorError(false);
    };
  }, []);

  return (
    <KitLayout>
      <div className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center bg-slate-950 text-teal-300">
                <GitCompare className="h-3.5 w-3.5" />
              </div>
              <h2 className="text-sm font-semibold text-slate-900">Input Texts</h2>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="h-8 w-32 border border-slate-200 bg-white text-xs text-slate-900">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="border border-slate-200 bg-white text-slate-900">
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value} className="text-xs">
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Original Text</label>
              <Textarea
                value={oldText}
                onChange={(e) => setOldText(e.target.value)}
                placeholder="Enter original text..."
                className="h-40 resize-none border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:ring-teal-50"
                spellCheck={false}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Modified Text</label>
              <Textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Enter modified text..."
                className="h-40 resize-none border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:ring-teal-50"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div id="diff-viewer" className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center bg-slate-950 text-teal-300">
                <GitCompare className="h-3.5 w-3.5" />
              </div>
              <h2 className="text-sm font-semibold text-slate-900">Diff Preview</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreenToggle}
              className="h-8 w-8 p-0 text-slate-500 hover:text-teal-700"
            >
              <Fullscreen className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-hidden border border-slate-200 bg-white">
            {editorError ? (
              <div className="flex h-[50vh] items-center justify-center bg-white text-slate-500">
                <div className="text-center">
                  <p className="mb-2 text-sm">Editor encountered an error</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditorError(false)}
                    className="text-xs"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            ) : (
              <DiffEditor
                height={isFullscreen ? "calc(100vh - 120px)" : "50vh"}
                width="100%"
                original={oldText}
                modified={newText}
                language={language}
                theme="vs-light"
                loading="Loading diff editor..."
                onMount={() => {}}
                options={{
                  fontSize: 13,
                  minimap: { enabled: true },
                  readOnly: false,
                  lineNumbers: 'on',
                  overviewRulerLanes: 0,
                  renderLineHighlight: 'all',
                  lineDecorationsWidth: 1,
                  wordWrap: 'on',
                  folding: true,
                  automaticLayout: true,
                  cursorBlinking: 'smooth',
                  cursorStyle: 'line',
                  cursorWidth: 2,
                  cursorSurroundingLines: 0,
                  scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
                  padding: { top: 8, bottom: 8 },
                }}
              />
            )}
          </div>
        </div>

        <div className="border border-slate-200 bg-slate-50/80 p-3">
          <div className="flex items-start gap-2">
            <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-slate-900">Features</h3>
              <ul className="space-y-0.5 text-xs text-slate-600">
                <li>• Real-time text comparison</li>
                <li>• Syntax highlighting support</li>
                <li>• Fullscreen diff view</li>
                <li>• Line-by-line difference highlighting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </KitLayout>
  );
}
