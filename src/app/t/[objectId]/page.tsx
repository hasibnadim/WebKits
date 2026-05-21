'use server'
import db, { CName } from '@/services/mongodb'
import { PublicFile, PublicText } from '@/services/publicText/interface'
import React from 'react'
import ShowText from './ShowText'
import ShowFile from './ShowFile'


const Page = async ({ params }: { params: Promise<{ objectId: string }> }) => {
    const { objectId } = await params

    try {
        const obj = await db.collection<PublicText & PublicFile>(CName.PublicText).findOne({ id: parseInt(objectId) })

        if (!obj) {
            return (
                    <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
                        <div className="flex items-center gap-2 mb-2">
                            <svg width="22" height="22" viewBox="0 0 24 24" className="text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <circle cx="12" cy="16" r="1" />
                        </svg>
                            <span className="text-sm font-semibold text-slate-900">No Object Found</span>
                    </div>
                        <p className="text-xs text-slate-600">The object you are looking for does not exist or has been removed.</p>
                </div>
            )
        }

        if (obj.text) {
            return (
                    <div className="rounded-md overflow-hidden border border-slate-200 mb-2 bg-white">
                        <ShowText text={obj.text} language={obj.language} />
                    </div>
            )
        } else if (obj.file) {
            return (
                    <div className="rounded-md overflow-hidden border border-slate-200 mb-2 bg-white">
                        <ShowFile base64={obj.file} name={obj.name} />
                    </div>
            )
        } else {
            return (
                    <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
                        <div className="flex items-center gap-2 mb-2">
                            <svg width="22" height="22" viewBox="0 0 24 24" className="text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <circle cx="12" cy="16" r="1" />
                        </svg>
                            <span className="text-sm font-semibold text-slate-900">Invalid Object</span>
                    </div>
                        <p className="text-xs text-slate-600">This object contains neither text nor file data.</p>
                </div>
            )
        }
    } catch (error) {
        console.error('Error fetching object:', error)
            return (
                <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
                    <div className="flex items-center gap-2 mb-2">
                        <svg width="22" height="22" viewBox="0 0 24 24" className="text-slate-500" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <circle cx="12" cy="16" r="1" />
                    </svg>
                        <span className="text-sm font-semibold text-slate-900">Error Loading Object</span>
                </div>
                    <p className="text-xs text-slate-600">An error occurred while loading the object.</p>
            </div>
        )
    }
}

export default Page