"use client"

import React, { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Download, Settings, QrCode, Sliders } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export default function QRapp() {
    const [value, setValue] = useState("https://www.google.com")
    const [QRSize, setQRSize] = useState(280)
    const [QRLevel, setQRLevel] = useState<"Q" | "M" | "L" | "H">("Q")
    const [QRbgColor, setQRbgColor] = useState("#FFFFFF")
    const [QRfgColor, setQRfgColor] = useState("#0b1220")
    const [QRmarginSize, setQRmarginSize] = useState(2)

    useEffect(() => {
        const bytes = new TextEncoder().encode(value).length
        if (bytes > 1500) {
            setValue(value.slice(0, 100))
            toast.error("Value too long - truncated to 100 characters")
        }
    }, [value, QRLevel])

    function saveToFile() {
        try {
            const canvas = document.getElementById('qrcode') as HTMLCanvasElement
            const pngUrl = canvas.toDataURL('image/png')
            const downloadLink = document.createElement('a')
            downloadLink.href = pngUrl
            downloadLink.download = `qrcode-${Date.now()}.png`
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
            toast.success("QR code downloaded successfully!")
        } catch {
            toast.error("Failed to download QR code")
        }
    }

    return (
        <div className="mx-auto w-full max-w-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-slate-950 text-teal-300">
                        <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-slate-900">QR Generator</h2>
                        <p className="text-xs text-slate-500">Create custom QR codes</p>
                    </div>
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:bg-teal-50 hover:text-teal-700">
                            <Settings className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 border border-slate-200 bg-white">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-900">
                                <Sliders className="h-4 w-4 text-teal-600" />
                                <span className="font-medium">Settings</span>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="mb-2 block text-sm text-slate-600">Margin ({QRmarginSize})</label>
                                    <Slider
                                        defaultValue={[QRmarginSize]}
                                        max={10}
                                        min={0}
                                        step={0.5}
                                        className="w-full"
                                        onValueChange={(e) => setQRmarginSize(e[0])}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-slate-600">Error Correction Level</label>
                                    <Select value={QRLevel} onValueChange={(e: "L" | "M" | "Q" | "H") => setQRLevel(e)}>
                                        <SelectTrigger className="w-full border border-slate-200 bg-white text-slate-900">
                                            <SelectValue placeholder="Level" />
                                        </SelectTrigger>
                                        <SelectContent className="border border-slate-200 bg-white">
                                            <SelectItem value="L" className="text-xs text-slate-900">L - Low (7%)</SelectItem>
                                            <SelectItem value="M" className="text-xs text-slate-900">M - Medium (15%)</SelectItem>
                                            <SelectItem value="Q" className="text-xs text-slate-900">Q - Quartile (25%)</SelectItem>
                                            <SelectItem value="H" className="text-xs text-slate-900">H - High (30%)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="mb-2 block text-sm text-slate-600">Background</label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="color"
                                                className="h-8 w-12 border border-slate-200 bg-white p-1"
                                                value={QRbgColor}
                                                onChange={(e) => setQRbgColor(e.target.value)}
                                            />
                                            <span className="text-xs text-slate-600">{QRbgColor}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm text-slate-600">Foreground</label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="color"
                                                className="h-8 w-12 border border-slate-200 bg-white p-1"
                                                value={QRfgColor}
                                                onChange={(e) => setQRfgColor(e.target.value)}
                                            />
                                            <span className="text-xs text-slate-600">{QRfgColor}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div>
                <label className="mb-2 block text-sm text-slate-700">Content</label>
                <Input
                    type="text"
                    className="w-full border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-400"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter URL, text, or data..."
                />
            </div>

            <div className="flex justify-center border border-slate-200 bg-slate-50/60 p-5">
                <QRCodeCanvas
                    level={QRLevel}
                    marginSize={QRmarginSize}
                    bgColor={QRbgColor}
                    fgColor={QRfgColor}
                    size={QRSize}
                    id="qrcode"
                    value={value}
                    title="QR Code"
                />
            </div>

            <div>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Size ({QRSize}px)</span>
                    <span className="border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800">
                        {Math.round((QRSize * QRSize * 4) / 1024)}KB
                    </span>
                </div>
                <Slider
                    defaultValue={[QRSize]}
                    max={400}
                    min={120}
                    step={10}
                    className="w-full"
                    onValueChange={(e) => setQRSize(e[0])}
                />
            </div>

            <Button
                className="w-full bg-slate-950 font-medium text-teal-300 hover:bg-teal-600 hover:text-white"
                onClick={saveToFile}
            >
                <Download className="mr-2 h-4 w-4" />
                Download PNG
            </Button>
        </div>
    )
}
