
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail, bad, getUidFromRequest } from "@/lib/api-helpers";
import type { KnowledgeFile } from "@/types";

// GET /api/user/knowledge - Fetches all knowledge base files for the user
export async function GET(req: Request) {
  if (!adminDb) return fail("Firebase Admin is not initialized.", 503);
  
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);
    
    const snapshot = await adminDb.collection('users').doc(uid).collection('knowledgeBase').orderBy('createdAt', 'desc').get();
    const files = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as KnowledgeFile));
    
    return ok(files);
  } catch (e) {
    return fail(e);
  }
}

// DELETE /api/user/knowledge?fileId=... - Deletes a knowledge base file
export async function DELETE(req: Request) {
    if (!adminDb) return fail("Firebase Admin is not initialized.", 503);

    try {
        const uid = await getUidFromRequest(req);
        if (!uid) return fail("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const fileId = searchParams.get('fileId');

        if (!fileId) return bad("fileId is required.");

        // Here you would also add logic to delete the file from Cloud Storage
        
        await adminDb.collection('users').doc(uid).collection('knowledgeBase').doc(fileId).delete();

        return ok({ success: true, fileId });
    } catch(e) {
        return fail(e);
    }
}
