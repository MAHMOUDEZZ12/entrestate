
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail, bad, getUidFromRequest } from "@/lib/api-helpers";
import { saveUserData } from "@/services/database";

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
        // Return an empty profile object if the user doc doesn't exist yet
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
    
    // Use the database service to handle the logic
    await saveUserData(uid, profileData);

    return ok({ success: true });
  } catch (e) {
    return fail(e);
  }
}
