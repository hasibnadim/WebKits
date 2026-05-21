import { MongoClient } from "mongodb"; 
import { PublicText } from "./publicText/interface";  
const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const dbClient = new MongoClient(uri);
const db = dbClient.db(dbName);
 
export enum CName { 
    PublicText = "public_text" 
}
export const migrate = async () => { 
    // CName.PublicText
    await db.collection<PublicText>(CName.PublicText).createIndex({ id: 1 }, { unique: true });
    await db.collection<PublicText>(CName.PublicText).createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    await db.collection<PublicText>(CName.PublicText).createIndex({ userId: 1 }, { unique: false });
 
 
};

export default db;
