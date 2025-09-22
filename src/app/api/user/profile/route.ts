
'use server';

import { adminDb, adminAuth } from "@/lib/firebaseAdmin";
import { ok, fail, bad } from "@/lib/api-helpers";

async function getUidFromRequest(req: Request): Promise<string | null> {
    if (!adminAuth) {
        console.error("Firebase Admin Auth is not initialized. Cannot verify ID token.");
        return null;
    }
    try {
        const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
        if (!idToken) {
            return null;
        }
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        return decodedToken.uid;
    } catch (error) {
        console.error("Error verifying ID token:", error);
        return null;
    }
}

export async function GET(req: Request) {
  if (!adminDb) {
    return fail("Firebase Admin is not initialized. Check server environment.", 503);
  }
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);
    
    const userDocRef = adminDb.collection('users').doc(uid);
    const userDoc = await userDocRef.get();
    
    if (!userDoc.exists) {
        return ok({});
    }

    return ok(userDoc.data());
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  if (!adminDb) {
    return fail("Firebase Admin is not initialized. Check server environment.", 503);
  }
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);

    const profileData = await req.json();
    
    const userDocRef = adminDb.collection('users').doc(uid);
    await userDocRef.set(profileData, { merge: true });

    return ok({ success: true });
  } catch (e) {
    return fail(e);
  }
}
