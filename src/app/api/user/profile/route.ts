
'use server';

import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail, bad } from "@/lib/api-helpers";
import { getAuth } from 'firebase-admin/auth';
import { getApps } from "firebase-admin/app";

async function getUidFromRequest(req: Request): Promise<string | null> {
    // If the admin app is not initialized, we cannot verify tokens.
    if (getApps().length === 0) {
        console.error("Firebase Admin SDK is not initialized. Cannot verify ID token.");
        return null;
    }
    try {
        const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
        if (!idToken) {
            return null;
        }
        const decodedToken = await getAuth().verifyIdToken(idToken);
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
