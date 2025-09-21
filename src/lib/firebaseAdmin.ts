
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
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
        if (serviceAccountString) {
            const serviceAccount = JSON.parse(serviceAccountString);
            adminApp = initializeApp({
                credential: cert(serviceAccount),
            });
        } else {
             adminApp = initializeApp({
                credential: applicationDefault(),
            });
        }
    } catch (error: any) {
        console.warn(`Firebase Admin SDK initialization failed: ${error.message}. This might be expected in certain environments. Falling back to default credentials if available.`);
        try {
            adminApp = initializeApp({
                credential: applicationDefault(),
            });
        } catch (fallbackError: any) {
            console.error("Firebase Admin SDK fallback initialization also failed:", fallbackError);
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
