'use client'
import React, { useMemo, useState } from 'react'
import { Download, FileArchive, Loader2 } from 'lucide-react'
import Link from 'next/link'

const ShowFile = ({ base64, name }: { base64: string; name: string }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const { file, fileSize, fileType } = useMemo(() => {
    try {
      const base64Data = base64.startsWith('data:') ? base64.split(',')[1] : base64
      const binaryString = atob(base64Data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const ext = name.split('.').pop()?.toLowerCase()
      const mimeTypes: Record<string, string> = {
        pdf: 'application/pdf',
        zip: 'application/zip',
        rar: 'application/vnd.rar',
        '7z': 'application/x-7z-compressed',
        txt: 'text/plain',
        json: 'application/json',
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
      }

      const mimeType = mimeTypes[ext || ''] || 'application/octet-stream'
      const blob = new Blob([bytes], { type: mimeType })

      return {
        file: blob,
        fileSize: blob.size,
        fileType: ext?.toUpperCase() || 'FILE',
      }
    } catch (error) {
      console.error('Error processing file:', error)
      return {
        file: new Blob(),
        fileSize: 0,
        fileType: 'UNKNOWN',
      }
    }
  }, [base64, name])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const url = URL.createObjectURL(file)
      const link = document.createElement('a')
      link.href = url
      link.download = name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      await new Promise((resolve) => setTimeout(resolve, 600))
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="futuristic-surface flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="overflow-hidden border border-slate-200/90 bg-white/80">
          <div className="border-b border-slate-800 bg-slate-950 px-6 py-8 text-center text-white">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-teal-500 text-slate-950">
              <FileArchive className="h-6 w-6" />
            </div>
            <h1 className="mb-1 truncate text-lg font-bold">{name}</h1>
            <p className="text-sm text-teal-300">{fileType} File</p>
          </div>

          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between border border-slate-200 bg-slate-50 px-3 py-2.5">
                <span className="text-sm text-slate-500">File Size</span>
                <span className="text-sm font-semibold text-slate-900">{formatFileSize(fileSize)}</span>
              </div>
              <div className="flex items-center justify-between border border-slate-200 bg-slate-50 px-3 py-2.5">
                <span className="text-sm text-slate-500">File Type</span>
                <span className="text-sm font-semibold text-slate-900">{fileType}</span>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex w-full items-center justify-center gap-2 bg-slate-950 px-6 py-3.5 text-sm font-semibold text-teal-300 transition-colors hover:bg-teal-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download File
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500">
          File will be automatically deleted after 72 hours ·{' '}
          <Link href="/" className="text-teal-700 hover:text-teal-600">
            WebKits
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ShowFile
