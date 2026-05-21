import db, { CName } from "@/services/mongodb";
import { PublicFile, PublicText } from "@/services/publicText/interface";
import { NextRequest, NextResponse } from "next/server"
const getUniqueId = async (): Promise<number> => {
    // random 4 digits and check if it is already in the database
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
        const { base64, name } = await body || {}
        if (!base64 || !name) return NextResponse.json({ error: 'invalid input' }, { status: 400 })
        const id = await getIdPromise
        if (!id) return NextResponse.json({ error: 'failed to generate id' }, { status: 500 })
        // save to db
        const publicFile: PublicFile = {
            id,
            file: base64, // Store base64 string directly instead of converting to Blob
            name,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72 hours
        };


        const result = await db.collection<PublicFile>(CName.PublicText).insertOne(publicFile);
        if (!result.insertedId) return NextResponse.json({ error: 'failed to save' }, { status: 500 })
        return NextResponse.json({ id }, { status: 201 })
    } catch (err) {

        console.log(err);
        return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
}