
'use server';

import {
  getApps,
  initializeApp,
  cert,
  applicationDefault,
  App,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App | undefined;

if (getApps().length === 0) {
    try {
        // This is the recommended approach for Google Cloud environments like Cloud Run
        adminApp = initializeApp({
            credential: applicationDefault(),
        });
    } catch (e: any) {
        console.warn(`Firebase Admin SDK initialization with default credentials failed: ${e.message}. This is expected in local development. Falling back to service account JSON.`);
        // Fallback for local development using a service account file
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (serviceAccountString) {
            try {
                const serviceAccount = JSON.parse(serviceAccountString);
                adminApp = initializeApp({
                    credential: cert(serviceAccount),
                });
            } catch (parseError: any) {
                 console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:", parseError);
            }
        } else {
            console.warn("FIREBASE_SERVICE_ACCOUNT environment variable not set. Firebase Admin SDK might not be initialized.");
        }
    }
} else {
    adminApp = getApps()[0];
}


const adminDb = adminApp ? getFirestore(adminApp) : null;

if (!adminDb) {
    console.warn("Firestore Admin DB is not available. This might happen if Firebase Admin SDK initialization failed or credentials are not configured in this environment.");
}


export { adminDb };
