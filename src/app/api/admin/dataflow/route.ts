
'use server';

import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase"; // Use client-side app for functions
import { ok, fail, getUidFromRequest } from "@/lib/api-helpers";
import { adminAuth } from "@/lib/firebaseAdmin";


export async function POST(req: Request) {
  try {
    const uid = await getUidFromRequest(req);
    const decodedToken = uid ? await adminAuth.getUser(uid) : null;
    // Simple admin check, in real app use custom claims
    if (!decodedToken || decodedToken.email !== 'dev@entrestate.com') {
      return fail("Unauthorized: Admin access required.", 403);
    }
    
    if (!app) {
        return fail("Firebase client is not initialized.", 503);
    }
    const functions = getFunctions(app);

    const { searchParams } = new URL(req.url);
    const jobType = searchParams.get('job');
    
    if (!jobType) {
        return fail("A 'job' parameter is required.", 400);
    }
    
    const triggerDataflow = httpsCallable(functions, 'triggerDataflow');
    const response = await triggerDataflow({
        jobType,
        params: {
            targetUrl: searchParams.get('targetUrl') // Example param
        }
    });

    return ok({ status: 'Dataflow job launch request sent.', job: response.data });

  } catch (e: any) {
    console.error("Dataflow API error:", e);
    return fail(e.message || 'Failed to trigger Dataflow job.', e.code === 'unauthenticated' ? 401 : 500);
  }
}
