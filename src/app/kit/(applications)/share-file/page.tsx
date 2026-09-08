'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardCheck, FileText, Loader2, Save, Upload } from 'lucide-react'
import { toast } from 'sonner'
import { QRCodeCanvas } from 'qrcode.react'
import KitLayout from '@/components/KitLayout'

const Page = () => {
  const [id, setId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [zipBase64, setZipBase64] = useState('')
  const [zipFile, setZipFile] = useState<File | null>(null)

  const handleSave = async () => {
    if (zipBase64.length > 0) {
      setIsLoading(true)
      fetch('/kit/share-file/api', {
        method: 'POST',
        body: JSON.stringify({
          base64: zipBase64,
          name: zipFile?.name || ''
        }),
      }).then(async (res) => {
        const data = await res.json()
        setId(data.id)
        setZipFile(null)
        setZipBase64('')
        toast.success('File saved successfully')
      }).catch(() => {
        toast.error('Error saving file')
      }).finally(() => {
        setIsLoading(false)
      })
    } else {
      toast.error('Please upload a file')
    }
  }

  const getShareUrl = (shareId: number) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/t/${shareId}`
    }
    return `/t/${shareId}`
  }

  return (
    <KitLayout>
      <div className="space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <div className="flex h-8 w-8 items-center justify-center bg-slate-950 text-teal-300">
            <ClipboardCheck className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-slate-900">Upload File</span>
        </div>

        {id ? (
          <div className="flex flex-col items-center gap-3 border border-slate-200 bg-white px-4 py-5">
            <span className="text-xs text-slate-500">Your file is saved at:</span>
            <a
              href={`/t/${id}`}
              className="break-all border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-teal-700 transition-colors hover:border-teal-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {getShareUrl(id)}
            </a>
            <span className="text-[11px] text-slate-400">Will expire in 72 hours</span>
            <div className="mt-1 flex gap-2">
              <Button
                size="sm"
                className="h-8 bg-teal-600 px-3 text-xs text-white shadow-none hover:bg-teal-500"
                onClick={() => {
                  navigator.clipboard.writeText(getShareUrl(id))
                  toast.success('Link copied to clipboard')
                }}
              >
                <ClipboardCheck className="mr-1 h-3 w-3" />
                Copy Link
              </Button>
              <Button
                size="sm"
                className="h-8 border border-slate-200 bg-white px-3 text-xs text-slate-800 shadow-none hover:border-teal-300"
                onClick={() => setId(null)}
              >
                <FileText className="mr-1 h-3 w-3" />
                New File
              </Button>
            </div>
            <QRCodeCanvas
              level="M"
              marginSize={1}
              bgColor="#ffffff"
              fgColor="#0b1220"
              size={220}
              id="qrcode"
              value={getShareUrl(id)}
              title={getShareUrl(id)}
              className="mt-2"
            />
          </div>
        ) : zipFile ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-slate-300 bg-white px-4 py-8">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <FileText className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-medium text-slate-900">{zipFile.name}</span>
              <span className="text-xs text-slate-500">
                ({zipFile.size > 1024 * 1024
                  ? (zipFile.size / (1024 * 1024)).toFixed(2) + ' MB'
                  : (zipFile.size / 1024).toFixed(2) + ' KB'})
              </span>
              <button
                className="ml-1 text-slate-400 transition hover:text-red-500"
                onClick={() => {
                  setZipFile(null)
                  setZipBase64('')
                }}
                aria-label="Remove file"
                type="button"
              >
                ✕
              </button>
            </div>
            <Button
              className="h-9 bg-slate-950 text-xs font-semibold text-teal-300 shadow-none hover:bg-teal-600 hover:text-white"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />Uploading...</>
              ) : (
                <><Save className="mr-1 h-3.5 w-3.5" />Upload & Create Link</>
              )}
            </Button>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="group flex h-40 w-full cursor-pointer flex-col items-center justify-center border border-dashed border-slate-300 bg-white transition hover:border-teal-400 hover:bg-teal-50/30"
          >
            <Upload className="mb-2 h-8 w-8 text-teal-600 transition group-hover:text-teal-700" />
            <span className="mb-1 text-sm font-medium text-slate-900">Click to upload ZIP file</span>
            <span className="text-xs text-slate-500">
              Only <span className="font-semibold">.zip</span> files are allowed
            </span>
            <input
              id="file-upload"
              type="file"
              accept=".zip,application/zip"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) {
                  const maxSize = 7 * 1024 * 1024
                  if (file.size > maxSize) {
                    toast.error('File size exceeds 10MB limit')
                    return
                  }
                  if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
                    setZipFile(file)
                    const reader = new FileReader()
                    reader.onload = (event) => {
                      setZipBase64(event.target?.result as string || '')
                    }
                    reader.readAsDataURL(file)
                  } else {
                    toast.error('Only ZIP files are allowed')
                  }
                }
              }}
            />
          </label>
        )}

        <div className="border border-slate-200 bg-slate-50/80 p-3">
          <div className="flex items-start gap-2">
            <ClipboardCheck className="mt-0.5 h-4 w-4 text-teal-600" />
            <div>
              <h3 className="mb-0.5 text-xs font-semibold text-slate-900">Features</h3>
              <ul className="space-y-0.5 text-xs text-slate-600">
                <li>• Share or copy file instantly</li>
                <li>• Download file instantly</li>
                <li>• File will be automatically deleted after 72 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </KitLayout>
  )
}

export default Page
