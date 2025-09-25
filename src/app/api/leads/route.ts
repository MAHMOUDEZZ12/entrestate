
import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail, bad, getUidFromRequest } from "@/lib/api-helpers";
import { z } from 'zod';

const leadSchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    email: z.string().email('Invalid email address.'),
    phone: z.string().optional(),
    status: z.string().default('New'),
});


// GET /api/leads - Fetches all leads for the user
export async function GET(req: Request) {
  if (!adminDb) return fail("Firebase Admin is not initialized.", 503);
  
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);
    
    const snapshot = await adminDb.collection('users').doc(uid).collection('leads').orderBy('createdAt', 'desc').get();
    const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    return ok(leads);
  } catch (e) {
    return fail(e);
  }
}

// POST /api/leads - Creates a new lead for the user
export async function POST(req: Request) {
  if (!adminDb) return fail("Firebase Admin is not initialized.", 503);
  
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);
    
    const body = await req.json();
    const validation = leadSchema.safeParse(body);

    if (!validation.success) {
      const message = validation.error.issues
        .map(i => `${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('; ');
      return bad(message);
    }
    
    const userDoc = await adminDb.collection('users').doc(uid).get();
    const userData = userDoc.data();
    const assigned_to = userData?.displayName || 'Unassigned';

    const leadData = {
        ...validation.data,
        interest_level: 'Medium', // Default value
        source: 'Manual Entry', // Default value
        assigned_to,
        lastContacted: new Date().toISOString(),
        createdAt: new Date(),
    };
    
    const docRef = await adminDb.collection('users').doc(uid).collection('leads').add(leadData);

    return ok({ success: true, leadId: docRef.id });

  } catch (e) {
    return fail(e);
  }
}
