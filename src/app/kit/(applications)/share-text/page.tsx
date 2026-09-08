'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardCheck, Loader2, Share2, Clock, Copy, Check, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { QRCodeCanvas } from 'qrcode.react'
import KitLayout from '@/components/KitLayout'

interface ShareTextState {
  text: string
  id: number | null
  isLoading: boolean
}

const TextEditor = ({ text, onTextChange }: { text: string; onTextChange: (text: string) => void }) => (
  <textarea
    value={text}
    onChange={e => onTextChange(e.target.value)}
    placeholder="Paste or type your text here..."
    className="w-full min-h-[360px] resize-y border border-slate-200 bg-white p-5 font-mono text-sm leading-relaxed text-slate-900 placeholder:text-slate-300 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-50"
  />
)

const LinkCard = ({ id, onNewText }: { id: number; onNewText: () => void }) => {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? `${window.location.origin}/t/${id}` : `/t/${id}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Link copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 border border-teal-200 bg-teal-50/60 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-teal-600 text-white">
          <ClipboardCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Ready to share</p>
          <p className="mt-0.5 text-xs text-slate-500">Your text is live at the link below</p>
        </div>
      </div>

      <div className="flex items-center gap-1 border border-slate-200 bg-slate-50 p-1">
        <div className="min-w-0 flex-1 truncate px-3 py-2.5">
          <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-teal-700 hover:text-teal-600">
            {url}
          </a>
        </div>
        <Button
          size="sm"
          onClick={copyLink}
          className="h-9 shrink-0 border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-none hover:border-teal-300 hover:bg-slate-50"
        >
          {copied ? (
            <><Check className="mr-1.5 h-4 w-4 text-teal-600" />Copied</>
          ) : (
            <><Copy className="mr-1.5 h-4 w-4" />Copy</>
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Expires in 30 days</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onNewText} className="h-8 px-3 text-xs text-slate-500 hover:text-teal-700">
          <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
          Share another
        </Button>
      </div>
    </div>
  )
}

const SuccessState = ({ id, onNewText }: { id: number; onNewText: () => void }) => {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/t/${id}` : `/t/${id}`
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <LinkCard id={id} onNewText={onNewText} />
      <div className="flex justify-center">
        <div className="border border-slate-200 bg-white p-4">
          <QRCodeCanvas level="M" marginSize={1} bgColor="#ffffff" fgColor="#0b1220" size={200} value={url} />
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  const [state, setState] = useState<ShareTextState>({ text: '', id: null, isLoading: false })

  const handleSave = async () => {
    if (state.text.trim().length === 0) {
      toast.error('Please enter some text')
      return
    }
    setState(prev => ({ ...prev, isLoading: true }))
    try {
      const res = await fetch('/kit/share-text/api', {
        method: 'POST',
        body: JSON.stringify({ language: 'plaintext', text: state.text }),
      })
      const data = await res.json()
      if (data?.id > 0) {
        setState(prev => ({ ...prev, id: data.id }))
        toast.success('Text saved!')
      } else {
        toast.error(data.error || 'Failed to save')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  return (
    <KitLayout>
      {state.id ? (
        <SuccessState id={state.id} onNewText={() => setState(prev => ({ ...prev, text: '', id: null }))} />
      ) : (
        <div className="space-y-4">
          <TextEditor text={state.text} onTextChange={v => setState(prev => ({ ...prev, text: v }))} />
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={state.isLoading || !state.text.trim()}
              className="h-10 bg-slate-950 px-6 text-sm font-medium text-teal-300 hover:bg-teal-600 hover:text-white disabled:opacity-40"
            >
              {state.isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
              ) : (
                <><Share2 className="mr-2 h-4 w-4" />Create Share Link</>
              )}
            </Button>
          </div>
        </div>
      )}
    </KitLayout>
  )
}

export default Page
