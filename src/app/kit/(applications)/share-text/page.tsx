'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardCheck, FileText, Loader2, Share2, Clock, Copy, Check, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { QRCodeCanvas } from 'qrcode.react'
import KitLayout from '@/components/KitLayout'

interface ShareTextState {
  text: string
  id: number | null
  isLoading: boolean
}

const TextEditor = ({ text, onTextChange }: { text: string; onTextChange: (text: string) => void }) => {
  return (
    <textarea
      value={text}
      onChange={e => onTextChange(e.target.value)}
      placeholder="Paste or type your text here..."
      className="w-full min-h-[360px] p-5 text-sm font-mono text-gray-900 bg-white border border-gray-200 rounded-xl resize-y focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 placeholder:text-gray-300 leading-relaxed"
    />
  )
}

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
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
        <div className="p-2.5 bg-blue-100 rounded-lg shrink-0">
          <ClipboardCheck className="h-5 w-5 text-blue-700" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Ready to share</p>
          <p className="text-xs text-gray-500 mt-0.5">Your text is live at the link below</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-1 flex items-center gap-1">
        <div className="flex-1 truncate px-3 py-2.5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 font-mono"
          >
            {url}
          </a>
        </div>
        <Button
          size="sm"
          onClick={copyLink}
          className="h-9 px-4 text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm rounded-lg shrink-0"
        >
          {copied ? (
            <><Check className="h-4 w-4 mr-1.5 text-green-600" />Copied</>
          ) : (
            <><Copy className="h-4 w-4 mr-1.5" />Copy</>
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock className="h-3.5 w-3.5" />
          <span>Expires in 30 days</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onNewText}
          className="h-8 px-3 text-xs text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Share another
        </Button>
      </div>
    </div>
  )
}

const SuccessState = ({ id, onNewText }: { id: number; onNewText: () => void }) => {
  const url = typeof window !== 'undefined' ? `${window.location.origin}/t/${id}` : `/t/${id}`

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <LinkCard id={id} onNewText={onNewText} />
      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <QRCodeCanvas
            level="M"
            marginSize={1}
            bgColor="#ffffff"
            fgColor="#1e293b"
            size={200}
            value={url}
            className="rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  const [state, setState] = useState<ShareTextState>({
    text: '',
    id: null,
    isLoading: false,
  })

  const handleSave = async () => {
    if (state.text.trim().length === 0) {
      toast.error('Please enter some text')
      return
    }

    setState(prev => ({ ...prev, isLoading: true }))
    try {
      const res = await fetch('/kit/share-text/api', {
        method: 'POST',
        body: JSON.stringify({
          language: 'plaintext',
          text: state.text,
        })
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

  const handleNewText = () => {
    setState(prev => ({ ...prev, text: '', id: null }))
  }

  return (
    <KitLayout title="Share Text" description="Expires after 30 days" category="General Kit">
      {state.id ? (
        <SuccessState id={state.id} onNewText={handleNewText} />
      ) : (
        <div className="space-y-4">
          <TextEditor text={state.text} onTextChange={v => setState(prev => ({ ...prev, text: v }))} />

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={state.isLoading || !state.text.trim()}
              className="h-10 px-6 text-sm bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all disabled:opacity-40"
            >
              {state.isLoading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</>
              ) : (
                <><Share2 className="h-4 w-4 mr-2" />Create Share Link</>
              )}
            </Button>
          </div>
        </div>
      )}
    </KitLayout>
  )
}

export default Page