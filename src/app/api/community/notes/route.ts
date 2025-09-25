
'use server';

import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail, bad, getUidFromRequest } from "@/lib/api-helpers";
import { z } from 'zod';

const requestSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters.'),
    type: z.enum(['Connection', 'Investor Request', 'Opinion', 'Review', 'Question', 'Self Intro']),
    content: z.string().min(10, 'Content is required.'),
    developerName: z.string().optional(),
    investorBudget: z.string().optional(),
    investorArea: z.string().optional(),
    notifyFirst: z.boolean().optional(),
});


export async function POST(req: Request) {
  if (!adminDb) {
    return fail("Firebase Admin is not initialized. Check server environment.", 503);
  }
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);
    
    const userDoc = await adminDb.collection('users').doc(uid).get();
    const userData = userDoc.data();
    const authorName = userData?.displayName || userData?.brandKit?.contact?.name || 'Anonymous';

    const body = await req.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
        return bad(validation.error.formErrors.fieldErrors);
    }
    
    const requestData = {
        ...validation.data,
        author: authorName,
        authorId: uid,
        createdAt: new Date(),
        comments: 0,
    };
    
    const docRef = await adminDb.collection('community_notes').add(requestData);

    return ok({ success: true, noteId: docRef.id });

  } catch (e) {
    return fail(e);
  }
}

export async function GET(req: Request) {
    if (!adminDb) {
        return fail("Firebase Admin is not initialized.", 503);
    }
    try {
        const snapshot = await adminDb.collection('community_notes').orderBy('createdAt', 'desc').limit(20).get();
        const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return ok(notes);
    } catch(e) {
        return fail(e);
    }
}

    
