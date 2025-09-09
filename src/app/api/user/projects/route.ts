
'use server';

import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail, bad } from "@/lib/api-helpers";
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import type { Project } from "@/types";

async function getUidFromRequest(req: Request): Promise<string | null> {
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
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);
    
    const userProjectsRef = adminDb.collection('users').doc(uid).collection('projects');
    const snapshot = await userProjectsRef.get();
    
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return ok(projects);
  } catch (e) {
    return fail(e);
  }
}

export async function POST(req: Request) {
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);

    const project = (await req.json()) as Project;
    if (!project || !project.id || !project.name) {
      return bad("Invalid project data provided.");
    }
    
    const userProjectRef = adminDb.collection('users').doc(uid).collection('projects').doc(project.id);
    await userProjectRef.set(project, { merge: true });

    return ok({ success: true, projectId: project.id });
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: Request) {
    try {
        const uid = await getUidFromRequest(req);
        if (!uid) return fail("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get('projectId');

        if (!projectId) {
            return bad("projectId is required.");
        }

        const userProjectRef = adminDb.collection('users').doc(uid).collection('projects').doc(projectId);
        await userProjectRef.delete();

        return ok({ success: true, projectId });
    } catch(e) {
        return fail(e);
    }
}
