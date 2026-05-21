import { NextRequest, NextResponse } from 'next/server'
import db, { CName } from '@/services/mongodb'
import { PublicText } from '@/services/publicText/interface'

const getUniqueId = async (): Promise<number> => {
    const id = Math.floor(1000 + Math.random() * 9000);
    const existing = await db
        .collection<PublicText>(CName.PublicText)
        .findOne({ id });
    if (existing) {
        return getUniqueId();
    }
    return id;
};

export async function POST(req: NextRequest) {
    try {
        const body = req.json()
        const getIdPromise = getUniqueId()
        const { text, language } = await body || {}

        if (!text || typeof text !== 'string') return NextResponse.json({ error: 'text is required' }, { status: 400 })
        if (!language || typeof language !== 'string') return NextResponse.json({ error: 'language is required' }, { status: 400 })

        const publicText: PublicText = {
            id: await getIdPromise,
            text: text,
            language: language,
            isPublic: true,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        };
        const result = await db.collection<PublicText>(CName.PublicText).insertOne(publicText);
        if (!result.insertedId) return NextResponse.json({ error: 'failed to save' }, { status: 500 })
        return NextResponse.json({ id: publicText.id }, { status: 201 })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}
