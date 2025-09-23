
'use server';

import { adminDb } from "@/lib/firebaseAdmin";
import { ok, fail, bad, getUidFromRequest } from "@/lib/api-helpers";
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from "uuid";

/**
 * This route handler acts as a secure backend-for-frontend (BFF) to interact with the Cloud Function for uploads.
 * It ensures that only authenticated users can get a signed URL and logs the file metadata upon completion.
 */

// POST: Request a signed URL for upload
export async function POST(req: Request) {
  if (!adminDb) return fail("Firebase Admin is not initialized.", 503);
  
  try {
    const uid = await getUidFromRequest(req);
    if (!uid) return fail("Unauthorized", 401);

    const { filename, contentType } = await req.json();
    if (!filename || !contentType) return bad("filename and contentType are required.");

    const fileId = uuidv4();
    const path = `knowledge_base/${uid}/${fileId}/${filename}`;
    
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    if (!bucketName) {
        throw new Error("Firebase Storage bucket is not configured in environment variables.");
    }
    
    const bucket = getStorage().bucket(bucketName);
    const file = bucket.file(path);

    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: contentType,
    });
    
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${path}`;
    
    return ok({ uploadUrl: url, fileUrl: fileUrl, fileId: fileId });

  } catch (e: any) {
    return fail(e);
  }
}

// PUT: Confirm upload and create Firestore record
export async function PUT(req: Request) {
    if (!adminDb) return fail("Firebase Admin is not initialized.", 503);
  
    try {
        const uid = await getUidFromRequest(req);
        if (!uid) return fail("Unauthorized", 401);

        const { fileId, fileName, fileUrl, fileType, fileSize } = await req.json();
        if (!fileId || !fileName || !fileUrl || !fileType || fileSize === undefined) {
            return bad("Missing required fields to confirm upload.");
        }

        const knowledgeBaseRef = adminDb.collection('users').doc(uid).collection('knowledgeBase');
        
        // Use the fileId from the POST request to ensure document ID consistency
        await knowledgeBaseRef.doc(fileId).set({
            fileName,
            fileUrl,
            type: fileType,
            size: fileSize,
            status: 'uploaded',
            createdAt: new Date(),
        });

        return ok({ success: true, fileId: fileId });

    } catch (e: any) {
        return fail(e);
    }
}

    